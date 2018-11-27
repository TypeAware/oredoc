'use strict';

import * as path from 'path';
import * as assert from 'assert';
import {ts, literal, simple, optional, typeMap, typeOptions, typeLink, chld} from '../symbols';
import {defaultBoolean, defaultInt, defaultString, defaultArrayType, defaultObject} from "../defaults";
import {joinMessages, symbols, TypeElaboration} from '../main';
import {Lang} from "./shared";
import * as util from "util";

const {conf} = new Lang({lang: 'typescript'});

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

const getStringFromTypeMap = (b: any): string => {
  
  // if(!(b && b[typeMap] === true)){
  //   throw new Error(joinMessages('The following value must have a typeMap symbol prop:', util.inspect(b)));
  // }
  
  if (typeof b === 'string') {
    return b;
  }
  
  const str = b[conf.lang];
  
  if (!(str && typeof str === 'string')) {
    throw new Error(joinMessages(`The following object must have a "${conf.lang}" prop:`, util.inspect(b)));
  }
  
  return str;
};

const reduceToFlatList = function (list: Array<any>): Array<string> {
  return list.slice(1).reduce((a, b) => {
      
      // console.error({a,b});
      
      if (Array.isArray(b)) {
        const pop = getStringFromTypeMap(a.pop());
        // const format = util.format(pop, ...reduceToFlatList(b));
        const format = reduceToFlatList(b).reduce((n, t) => n.replace('?', t), pop);
        return (a.push(format.replace(/\?/g, 'any')), a); // we replace any remaining "?" chars with "any"
      }
      
      const str = getStringFromTypeMap(b);
      return (a.push(str), a);
      
    },
    
    [
      getStringFromTypeMap(list[0])
    ]
  );
};

// const list = ['Array', 'Map<%s,%s, %s>', ['xxx', 'Map<%s,%s>', ['string', 'boolean'], 'number']];
// console.error(reduceToFlatList(list));

export const generate = (src: string) => {
  
  const input = require(src);
  assert(input.entities, 'no entities exported from .js file.');
  
  const result: Array<string> = [
    'export namespace Entities {'
  ];
  
  const loop = function (v: any, parent: any, spaceCount: number, withinInterface: boolean) {
  
    if (Array.isArray(v)) {
      throw new Error('Unexpected array object.');
    }
    
    const space = new Array(spaceCount).fill(null).join(' ');
    spaceCount += 2;
    
    for (let k of Object.keys(v)) {
      
      const rhs = v[k];
      
      if (rhs && typeof rhs === 'object') {
        rhs[symbols.Parent] = v;
        rhs[symbols.NamespaceName] = k;
      }
      
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
          else if (elab.linkfn) {
            const val = elab.linkfn();
            if (!val) {
              throw new Error('You tried to link to a namespace in the object tree, but which was undefined.');
            }
            const name = (val as any)[symbols.NamespaceName];
            if (!name) {
              throw new Error('Cannot refer to a namespace which is not in scope.');
            }
            result.push(space + `${cleanKey}: ${String(name)},`);
          }
          else if (elab.compound) {
            // console.error({compaound: elab.compound[1]});
            const flatList = reduceToFlatList(elab.compound);
            console.error({flatList});
            const literalType = flatList.reduceRight((a, b) => {
              return [b, '<', a, '>'].join('');
            });
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
