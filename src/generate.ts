import * as path from 'path';
import * as assert from 'assert';

const getString = (v: boolean | string | number) => {
  
  if (typeof v === 'boolean') {
    return 'boolean';
  }
  
  if (typeof v === 'string') {
    return `'${v}'`;
  }
  
  if (typeof v === 'number') {
    return 'number';
  }
  
  throw new Error('primitive not recognized: ' + typeof v);
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
    
    for (let k of Object.keys(v)) {
      
      if(k === '@interface'){
        continue;
      }
      
      if (!(v[k] && typeof v[k] === 'object')) {
        const val = getString(v[k]);
        
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
        startInterface = v[k]['@interface'] === true;
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
  
  console.log(result.join('\n') + '}')
  
};

generate(path.resolve(__dirname + '/../test/input.js'));
