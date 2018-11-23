'use strict';

import * as path from 'path';
import * as assert from 'assert';
import {joinMessages, TypeElaboration} from '../main';
import {Lang} from "./shared";
import * as util from "util";
import * as symbols from "../symbols";

//////////////////////////////////////////////////////

const conf = new Lang({lang: 'java'});

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

const verifyLink1 = function (list: Array<string>, v: any): boolean {
  const prop = list[0];
  const parent = v[symbols.Parent];
  
  if (!parent) {
    throw new Error('Could not XXX find parent link.');
  }
  
  const map = <Map<string, any>>parent[symbols.NSRename];
  
  if (!map) {
    throw new Error('XXX Could not find not find  XXX namespace-map in parent object.');
  }
  
  if (!map.has(prop)) {
    throw new Error(joinMessages('Could not XXX find the following prop:', prop, 'in the map:', util.inspect(map)));
  }
  
  if (list.length < 1) {
    return true;
  }
  
  return verifyLink1(list, parent);
};

const verifyLink = function (list: Array<string>, v: any, down: boolean, depth: number): boolean {
  
  if (depth < 0) {
    return false;
  }
  
  const prop = list[0];
  const map = <Map<string, any>>v[symbols.NSRename];
  
  if (!map) {
    throw new Error(
      joinMessages(
        'Could not find not find namespace-map in parent object:',
        util.inspect(v)
      )
    );
  }
  
  const child = map.get(prop);
  
  if (child && list.length === 1) {
    return true;
  }
  
  if (child) {
    const result = verifyLink(list.slice(1), child, true, depth - 1);
    if (result) {
      return true;
    }
  }
  
  if (down) {  // we were traversing down the tree, no need to back up
    return;
  }
  
  const parent = v[symbols.Parent];
  
  if (!parent) {
    throw new Error('Could not find parent link.');
  }
  
  return verifyLink(list, parent, false, depth + 1);
};

const verifyLinkWrapper = (originalLink: string, v: any) => {
  const linkage = originalLink.split('.');
  console.error(verifyLinkWrapper.name, 'being called with:', linkage);
  try {
    const r = verifyLink(linkage, v, false, 0);
    if (r !== true) {
      throw new Error(
        'Could not verify type-link, the return value of validation routine was not true.'
      );
    }
  }
  catch (err) {
    console.error('Could not verify type-link with path:', originalLink);
    throw err;
  }
};

export const generate = (src: string) => {
  
  const input = require(src);
  assert(input.entities, 'no entities exported from .js file.');
  
  const result: Array<string> = [
    'public class Entities {'
  ];
  
  const loop = function (v: any, spaceCount: number, withinInterface: boolean) {
    
    if (Array.isArray(v)) {
      throw new Error('Unexpected array object.');
    }
    
    const space = new Array(spaceCount).fill(null).join(' ');
    
    const rn = v[symbols.NSRename] = new Map<string, any>();
    
    for (let k of Object.keys(v)) {
      
      const rhs = v[k];
      const cleanKey = getCleanKeyString(k);
      const type = typeof rhs;
      
      if (rhs && typeof rhs === 'object') {
        rhs[symbols.Parent] = v;
        rhs[symbols.NamespaceName] = k;
        rn.set(k, rhs);
      }
      
      if (v[symbols.chld.literal] === true) {
        
        if (!(rhs && typeof rhs === 'string')) {
          throw new Error('Parent has a "chld.literal" tag, but child value is not a string.');
        }
        
        result.push(space + `${rhs} ${cleanKey};`);
        continue;
      }
      
      if (!(rhs && typeof rhs === 'object')) {
        if (!(rhs && typeof rhs === 'string')) {
          throw new Error('Literal type string assumed, but it is not a string or undefined/empty.');
        }
        result.push(space + `${rhs} ${cleanKey};`);
        continue;
      }
      
      if (rhs[symbols.literal] === true) {
        
        if (!(rhs.value && typeof rhs.value === 'string')) {
          throw new Error('Has a "literal" tag, but value prop is undefined or is not a string.');
        }
        
        result.push(space + `${rhs.value} ${cleanKey};`);
        continue;
      }
      
      // if (withinInterface) {
      //   console.error('we are witin interface.');
      //   result.push(space + `${k}: {`);
      //   loop(v[k], spaceCount + 2, true);
      //   result.push(space + '}');
      //   continue;
      // }
      
      if (rhs[symbols.typeLink] === true) {
        {
          const val = rhs.link;
          verifyLinkWrapper(val, rhs);
          result.push(space + `${val} ${cleanKey};`);
        }
        continue;
      }
      
      if (rhs[symbols.typeMap] === true) {
        {
          const val = getString(rhs);
          result.push(space + `${val} ${cleanKey};`);
        }
        continue;
      }
      
      if (rhs[symbols.typeOptions] === true) {
        {
          const elab = <TypeElaboration>rhs.elab;
          
          if (!elab) {
            throw new Error(joinMessages('Missing "elab" property:', util.inspect(rhs)));
          }
          
          if (elab.type) {
            const val = getString(elab);
            result.push(space + `${val} ${cleanKey};`);
          }
          else if (elab.link) {
            verifyLinkWrapper(elab.link, v);
            result.push(space + `${elab.link} ${cleanKey};`);
          }
          else if (elab.linkfn) {
            
            let val, name;
            try {
              val = elab.linkfn();
              assert(val && typeof val === 'object');
              name = (val as any)[symbols.NamespaceName];
              assert.equal(typeof name, 'string', 'Could not read namespace symbol from namespace object.')
            }
            catch (err) {
              console.error('You tried to link to a namespace in the object tree, but the path was undefined.');
              console.error('Could not load path with linkfn:', String(elab.linkfn));
              throw err;
            }
            
            verifyLinkWrapper(name, v);
            result.push(space + `${String(name)} ${cleanKey};`);
          }
          else if (elab.compound) {
            // console.error({compaound: elab.compound[1]});
            const flatList = reduceToFlatList(elab.compound);
            console.error({flatList});
            const literalType = flatList.reduceRight((a, b) => {
              return [b, '<', a, '>'].join('');
            });
            result.push(space + `${literalType} ${cleanKey};`);
          }
          else {
            throw new Error('no link or type ' + util.inspect(elab));
          }
          
        }
        continue;
      }
      
      if (Array.isArray(rhs)) {
        
        {
          const [type, value] = rhs;
          const literalType = getString(type);
          
          if (value === undefined) { // TODO: check array length instead of for undefined
            result.push(space + `${literalType} ${cleanKey};`);
          }
          else {
            result.push(space + `${literalType} ${cleanKey} = ${value};`);
          }
          
        }
        continue;
      }
      
      let startInterface = rhs[symbols.java.interface] === true;
      
      if (startInterface) {
        result.push(space + `public static interface ${k} {`);
      }
      else {
        result.push(space + `public static class ${k} {`);
      }
      
      loop(v[k], spaceCount + 2, startInterface);
      result.push(space + '}');
      
    }
    
  };
  
  loop(input.entities, 2, false);
  console.log(result.join('\n') + '\n}')
  
};

const f = process.env.input_file;
generate(path.resolve(f));
