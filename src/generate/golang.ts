import * as path from 'path';
import * as assert from 'assert';
import * as cp from 'child_process';
import * as fs from 'fs'
import {interfac, type, literal, struct} from '../symbols';
import {joinMessages} from '../main';
import * as async from 'async';

const getString = (v: boolean | string | number, isLiteral: boolean) => {
  
  if (typeof v === 'boolean') {
    return isLiteral ? v : 'boolean';
  }
  
  if (typeof v === 'string') {
    if (isLiteral) {
      return `'${v}'`
    }
    if (v === 'string') {
      return 'string';
    }
    if (v === 'boolean') {
      return 'bool';
    }
    if (v === 'number') {
      return 'int';
    }
  }
  
  if (typeof v === 'number') {
    return isLiteral ? v : 'number';
  }
  
  throw new Error(joinMessages('primitive not recognized:', v, typeof v));
};

export type EVCb<T> = (err: any, val?: T) => void;

const handleInterface = (v: any, k: string, dir: string) => {
  
  const bn = path.basename(dir).toLowerCase();
  const f = path.resolve(dir, k + '.go');
  const strm = fs.createWriteStream(f);
  strm.write(`package ${bn}\n\n`);
  
  // strm.write(`type ${k} struct {\n`);
  const loop = (v: any, spaceCount: number) => {
    
    const space = new Array(spaceCount).fill(null).join(' ');
    const isLiteral = v[type] !== true;
    
    for (let k of Object.keys(v)) {
      
      if (!(v[k] && typeof v[k] === 'object')) {
        const val = getString(v[k], isLiteral);
        
        if (/[^a-zA-z0-9]/.test(k)) {
          k = `'${k}'`;
        }
        
        strm.write(space + `${k} ${val}\n`);
        continue;
      }
      
      strm.write(space + ` ${k} struct {\n`);
      loop(v[k], spaceCount + 2);
      strm.write(space + '}\n');
    }
    
  };
  
  loop(v, 0);
  strm.end('\n');
  
};

export const generate = (root: string, src: string) => {
  
  const input = require(src);
  assert(input.entities, 'no entities exported from .js file.');
  
  type Task = (cb: EVCb<any>) => void;
  const q = async.queue<Task, any>((task, cb) => task(cb), 8);
  
  const loop = function (dir: string, v: any, spaceCount: number) {
    
    if (Array.isArray(v)) {
      throw new Error('Got unexpected array object.');
    }
    
    q.push(cb => {
      
      const k = cp.spawn('bash');
      k.stdin.end(`mkdir -p "${dir}"`);
      
      k.once('exit', code => {
        
        cb(null);
        
        if (code > 0) {
          throw new Error('Could not create dir.');
        }
        
        const space = new Array(spaceCount).fill(null).join(' ');
        const isLiteral = v[type] !== true;
        
        for (let k of Object.keys(v)) {
          
          if (!(v[k] && typeof v[k] === 'object')) {
            const val = getString(v[k], isLiteral);
            
            if (/[^a-zA-z0-9]/.test(k)) {
              k = `'${k}'`;
            }
            
            continue;
          }
          
          const nextDir = path.resolve(dir, String(k).toLowerCase());
          let startStruct = false;
          
          try {
            startStruct = v[k][struct] === true;
          }
          catch (err) {
            // ignore
          }
          
          if (!startStruct) {
            loop(nextDir, v[k], spaceCount + 2);
            continue;
          }
          
          handleInterface(v[k], k, dir);
        }
      });
    });
    
  };
  
  loop(root, input, 2);
  
};

const root = path.resolve(__dirname + '/../../typings');
generate(root, path.resolve(__dirname + '/../../test/input.js'));
