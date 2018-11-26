import * as path from 'path';
import * as assert from 'assert';
import * as cp from 'child_process';
import * as fs from 'fs'
import {ts, type, literal, go} from '../symbols';
import {joinMessages} from '../main';
import * as async from 'async';
import {Writable} from "stream";
import {Lang} from "./shared";

const conf = new Lang({lang: 'golang'});

const flattenDeep = (v: Array<any>): Array<any> => {
  return v.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};

const getString = (v: any, isLiteral: boolean) => {
  
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

const handleFile = (v: any, dir: string) => {
  
  const bn = path.basename(dir).toLowerCase();
  const f = path.resolve(dir, `${bn}.go`);
  const strm = fs.createWriteStream(f);
  strm.write(`package ${bn}\n\n`);
  
  const loop = (v: any, spaceCount: number, depth: number) => {
    
    const space = new Array(spaceCount).fill(null).join(' ');
    const isLiteral = v[type] !== true;
    
    for (let k of Object.keys(v)) {
      
      const rhs = v[k];
      
      if (!(rhs && typeof rhs === 'object')) {
        const val = getString(rhs, isLiteral);
        
        if (/[^a-zA-z0-9]/.test(k)) {
          k = `'${k}'`;
        }
        
        strm.write(space + `${k} ${val}\n`);
        continue;
      }
      
      if (depth === 0) {
        strm.write(space + `type ${k} struct {\n`);
      }
      else {
        strm.write(space + `${k} struct {\n`);
      }
      
      loop(rhs, spaceCount + 2, ++depth);
      strm.write(space + '}\n');
    }
    
  };
  
  loop(v, 0, 0);
  strm.end('\n');
  
};

const capitalizeFirstChar = (txt: string): string => {
  return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
};

const handleFolder = (filePath: string, packageName: string, imports: Array<any>, children: Array<any>) => {
  
  const strm = fs.createWriteStream(filePath);
  strm.write(`package ${packageName}\n\n`);
  
  for (let v of imports) {
    strm.write(`import "./${v.packageName || "vxxxxp"}"\n`)
  }
  
  if (imports.length > 0) {
    strm.write('\n');
  }
  
  for (let v of children) {
    strm.write(`type ${v.long} = ${v.packageName}.${v.short}\n`);
  }
  
  strm.end();
  
};

export const generate = (root: string, src: string) => {
  
  const input = require(src);
  assert(input.entities, 'no entities exported from .js file.');
  
  type Task = (cb: EVCb<any>) => void;
  const q = async.queue<Task, any>((task, cb) => task(cb), 8);
  
  const circularRefCache = new Set<any>();
  
  const to = setTimeout(() => {
    console.error('timed out.');
  }, 3500);
  
  q.drain = q.error = <any>((err: any) => {
    
    clearTimeout(to);
    
    if (err) {
      throw err;
    }
    
  });
  
  interface Opts {
    spaceCount: number,
    isInterface: boolean,
    startEntity: boolean,
    startFile: boolean
  }
  
  const loop = function (dir: string, v: any, {startFile, spaceCount, startEntity, isInterface}: Opts, cb: EVCb<Array<any>>) {
    
    if (Array.isArray(v)) {
      throw new Error('Got unexpected array object.');
    }
    
    q.push(callback => {
      
      const k = cp.spawn('bash');
      k.stdin.end(`mkdir -p "${dir}";`);
      
      k.once('exit', code => {
        
        callback(null);
        
        if (code > 0) {
          throw new Error('Could not create dir.');
        }
        
        const space = new Array(spaceCount).fill(null).join(' ');
        spaceCount += 2;
        const isLiteral = v[type] !== true;
        
        for (let k of Object.keys(v)) {
          
          const rhs = <any>v[k];
          
          if (circularRefCache.has(rhs)) {
            throw new Error(
              'Circular reference detected in the config tree. Circular references not allowed.'
            );
          }
          else {
            circularRefCache.add(rhs);
          }
          
          const keyname = String(k).toLowerCase();
          const nextDir = path.resolve(dir, keyname);
          
          if (!(rhs && typeof rhs === 'object')) {
            
            if (!startFile) {
              throw new Error('We are not within a .go file, so we cannot handle a non-object value yet.')
            }
            
            const val = getString(rhs, isLiteral);
            
            if (/[^a-zA-z0-9]/.test(k)) {
              k = `'${k}'`;
            }
            
            continue;
          }
          
          const startStruct = rhs[go.struct] === true;
          startFile = startFile || rhs[go.file] === true;
          startEntity = startEntity || rhs[go.entity] === true;
          
          if (!startStruct) {
            loop(nextDir, rhs, {spaceCount, startFile, isInterface: false, startEntity}, cb);
            continue;
          }
          
          loop(nextDir, rhs, {spaceCount, startFile, isInterface: true, startEntity});
          
        }
        
        cb(null);
      });
    });
    
  };
  
  loop(root, input, {
    spaceCount: 2,
    startFile: false,
    isInterface: false,
    startEntity: false
  }, (err, results) => {
    
    console.log({err, results});
  
  });
  
};

const cwd = process.cwd();

if (path.basename(cwd) !== 'oredoc') {
  throw 'Not in the right cwd.';
}

const root = path.resolve(cwd, 'test/builds/go/src/one');
generate(root, path.resolve(cwd, 'test/builds/go/src/one/input.js'));
