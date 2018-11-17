import * as path from 'path';
import * as assert from 'assert';
import {interfac,type,literal} from '../symbols';
import {defaultBoolean, defaultInt, defaultString} from "../defaults";
import {joinMessages} from '../main';

const getString = (v: any, isLiteral: boolean) => {

  if(v === defaultInt){
    return defaultInt['typescript'];
  }

  if(v === defaultString){
    return defaultString['typescript'];
  }

  if(v === defaultBoolean){
    return defaultBoolean['typescript'];
  }
  
  if (typeof v === 'boolean') {
    return isLiteral ? v : 'boolean';
  }
  
  if (typeof v === 'string') {
     if(isLiteral) {
       return `'${v}'`
     }
     if(v === 'string'){
       return 'string';
     }
     if(v === 'boolean'){
       return 'boolean';
     }
     if(v === 'number'){
       return 'number';
     }
     
  }
  
  if (typeof v === 'number') {
    return isLiteral ? v : 'number';
  }
  
  throw new Error(joinMessages('primitive not recognized:', v, typeof v));
};

export const generate = (src: string) => {
  
  const input = require(src);
  assert(input.entities, 'no entities exported from .js file.');
  
  const result: Array<string> = [
    'export namespace Entities {'
  ];
  
  const loop = function (v: any, spaceCount: number, withinInterface: boolean) {
    
    if (Array.isArray(v)) {
      throw new Error('Got unexpected array object.');
    }
    
    const space = new Array(spaceCount).fill(null).join(' ');
    
    const isLiteral = v[type] !== true;

    for (let k of Object.keys(v)) {
      

      if(!isLiteral || !(v[k] && typeof v[k] === 'object')){
        const val = getString(v[k], isLiteral);
        
        if(/[^a-zA-z0-9]/.test(k)){
          k = `'${k}'`;
        }
        
        result.push(space + `${k}: ${val},`);
        continue;
      }
      
      if (withinInterface) {
        console.error('we are witin interface.');
        result.push(space + `${k}: {`);
        loop(v[k], spaceCount + 2, true);
        result.push(space + '}');
        continue;
      }
  
      let startInterface = false;
      
      try {
        startInterface = v[k][interfac] === true;
      }
      catch (err) {
        // ignore
      }
      
      if (startInterface) {
        result.push(space + `export interface ${k} {`);
      }
      else {
        result.push(space + `export namespace ${k} {`);
      }
      
      loop(v[k], spaceCount + 2, startInterface);
      result.push(space + '}');
      
    }
    
  };
  
  loop(input.entities, 2, false);
  
  console.log(result.join('\n') + '\n}')
  
};

generate(path.resolve(__dirname + '/../../test/input.js'));
