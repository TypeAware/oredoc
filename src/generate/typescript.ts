'use strict';

import * as path from 'path';
import * as assert from 'assert';
import {ts, literal, simple, optional, typeMap, typeOptions, typeLink, chld} from '../symbols';
import {defaultBoolean, defaultInt, defaultString, defaultArrayType, defaultObject} from "../defaults";
import {joinMessages, TypeElaboration} from '../main';
import {Lang} from "./shared";
import * as util from "util";

const conf = new Lang({lang: 'typescript'});

const getString = (v: any) => {
  
  const ret = v[conf.lang];
  
  if (!ret) {
    throw new Error(joinMessages(`Map does not contain key: "${conf.lang}"`, util.inspect(v)));
  }
  
  return ret;
};

const getCleanKeyString = (k: string) => {
  return /[^a-zA-z0-9]/.test(k) ? `'${k}'` : k;
};


const reduce = function(list: Array<any>){
  return list.slice(1).reduce((a,b) => {
      
      if(Array.isArray(b)){
        const pop = a.pop();
        const format = util.format(pop,...reduce(b));
        return a.concat(format);
      }
      
      return (a.push(b), a);
      
    },
    [list[0]]
  );
};


export const generate = (src: string) => {
  
  const input = require(src);
  assert(input.entities, 'no entities exported from .js file.');
  
  const result: Array<string> = [
    'export namespace Entities {'
  ];
  
  const loop = function (v: any, parent: any, spaceCount: number, withinInterface: boolean) {
    
    if (Array.isArray(v)) {
      console.error('we have an array:', v);
      return result.push('Array<any>')
    }
    
    const space = new Array(spaceCount).fill(null).join(' ');
    spaceCount += 2;
    
    if (parent && parent.fooLiteral) {
      console.error(v, {parent});
    }
    
    for (let k of Object.keys(v)) {
      
      const rhs = v[k];
      
      const checkForSymbol = () => {
        return [typeLink, typeMap, typeOptions].some(v => {
          return rhs[v] === true;
        });
      };
      
      const cleanKey = getCleanKeyString(k);
      
      if (!withinInterface) {
        if (cleanKey !== k) {
          throw new Error('Namespace key must not have special characters.');
        }
        
        if (checkForSymbol()) {
          throw new Error('Cannot create a type if you are not within an interface.');
        }
      }
      
      const type = typeof rhs;
      
      if (v[chld.literal] === true) {
        
        if (!(rhs && typeof rhs === 'string')) {
          throw new Error('Parent has a "chld.literal" tag, but child value is not a string.');
        }
        
        result.push(space + `${cleanKey}: ${rhs},`);
        continue;
      }
      
      if (!(rhs && typeof rhs === 'object')) {
        result.push(space + `${cleanKey}: '${rhs}',`);
        continue;
      }
      
      if (rhs[literal] === true) {
        {
          const val = rhs.link;
          result.push(space + `${cleanKey}: ${val},`);
        }
        continue;
      }
      
      if (rhs[typeLink] === true) {
        {
          const val = rhs.link;
          result.push(space + `${cleanKey}: ${val},`);
        }
        continue;
      }
      
      if (rhs[typeMap] === true) {
        {
          const val = getString(rhs);
          result.push(space + `${cleanKey}: ${val},`);
        }
        continue;
      }
      
      if (rhs[typeOptions] === true) {
        {
          const elab = <TypeElaboration>rhs.elab;
          
          if (!elab) {
            throw new Error(joinMessages('Missing "elab" property:', util.inspect(rhs)));
          }
          
          if (elab.type) {
            const val = getString(elab);
            result.push(space + `${cleanKey}: ${val},`);
          }
          else if (elab.link) {
            result.push(space + `${cleanKey}: ${elab.link},`);
          }
          else if (elab.compound){
            const literalType = elab.compound.reduceRight((a, b) => {
              
              if(Array.isArray(b)){
                return
              }
              
              const outer = b[conf.lang];
              if(a === ''){
                return outer;
              }
              return [outer, '<', a, '>'].join('');
            },'');
            result.push(space + `${cleanKey}: ${literalType},`);
          }
          else {
            throw new Error('no link or type ' + util.inspect(elab));
          }
          
        }
        continue;
      }
      
      if (Array.isArray(rhs)) {
        {
          
          const firstElem = rhs[0];
          
          if ((<any>rhs)[ts.inline] === true) {
            
            throw new Error('ts.inline not yet implemented.');
            
            // const firstElem = rhs[0];
            // if (Array.isArray(firstElem)) {
            //   result.push(space + `${k}: Array<Array<any>>`);
            // }
            // else if (hasDefault(firstElem)) {
            //   result.push(space + `${k}: Array<${getString(firstElem, isLiteral)}>`);
            // }
            // else if (firstElem && typeof firstElem === 'object') {
            //   result.push(space + `${k}: Array<{`);
            //   loop(firstElem, spaceCount, true);
            //   result.push(space + '}>');
            // }
            // else {
            //   const literalType = (<any>defaultArrayType)[firstElem]['typescript'];
            //   result.push(space + `${k}: Array<${literalType}>`);
            // }
            
          }
          else if (firstElem[typeMap] === true) {
            const literalType = (<any>firstElem)['typescript'];
            result.push(space + `${cleanKey}: Array<${literalType}>`);
          }
          else if ((<any>rhs)[literal] === true) {
            const literalType = rhs.reverse().reduce((a, b) => {
              return [b, '<', a, '>'].join('');
            });
            result.push(space + `${cleanKey}: Array<${literalType}>,`);
          }
          else if ((<any>rhs)[typeMap] === true) {  // (<any>rhs)[simple] === true
            const literalType = (<any>rhs)['typescript'];
            result.push(space + `${cleanKey}: Array<${literalType}>`);
          }
          else {
            console.error('Creating default object type:', rhs);
            const literalType = (<any>defaultObject)['typescript'];
            result.push(space + `${cleanKey}: Array<${literalType}>`);
          }
        }
        
        continue;
      }
      
      if (withinInterface) {
        result.push(space + `${cleanKey}: {`);
        loop(v[k], v, spaceCount, true);
        result.push(space + '}');
        continue;
      }
      
      const startInterface = rhs[ts.interface] === true;
      const startClass = rhs[ts.class] === true;
      
      if (startClass && startInterface) {
        throw new Error(joinMessages('Both interface and class were tags on object:', util.inspect(rhs)));
      }
      
      if (startInterface) {
        result.push(space + `export interface ${k} {`);
      }
      else if (startClass) {
        result.push(space + `export class ${k} {`);
      }
      else {
        result.push(space + `export namespace ${k} {`);
      }
      
      loop(v[k], v, spaceCount, startInterface);
      result.push(space + '}');
      
    }
    
  };
  
  loop(input.entities, null, 2, false);
  console.log(result.join('\n') + '\n}')
  
};

const f = process.env.input_file;
generate(path.resolve(f));
