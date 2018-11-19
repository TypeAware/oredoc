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

const handleInterface = (v: any, dir: string) => {

  const bn = path.basename(dir).toLowerCase();
  const f = path.resolve(dir, 'types.go');
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

      loop(v[k], spaceCount + 2, ++depth);
      strm.write(space + '}\n');
    }

  };

  loop(v, 0, 0);
  strm.end('\n');

};

const capitalizeFirstChar = (txt: string): string => {
  return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
};

export const generate = (root: string, src: string) => {

  const input = require(src);
  assert(input.entities, 'no entities exported from .js file.');

  interface EntitiesMap {
    filePath: string, // fileName is baseName of file path
    name: string,  // name might be different than baseName
    packageName: string,
    children: Array<EntitiesMap>,
    fileName: string,
    entity: boolean
  }

  const bn = path.basename(root);
  const ent: EntitiesMap = {
    filePath: path.resolve(root, bn + '.go'),
    name: bn,
    packageName: bn,
    fileName: bn + '.go',
    children: [],
    entity: false
  };

  type Task = (cb: EVCb<any>) => void;
  const q = async.queue<Task, any>((task, cb) => task(cb), 8);


  const to = setTimeout(() => {
    console.error('timed out.');
  }, 2500);

  q.drain = q.error = <any>((err: any) => {

    clearTimeout(to);

    if (err) {
      throw err;
    }

    process.nextTick(() => {

      interface ResultMap {
        childField: string,
        allFields: string
      }

      interface AllObj {
        short:string,
        long: string
      }

      const loop = (ent: EntitiesMap): Array<AllObj> => {

        let strm: Writable = null;
        let nextVal = capitalizeFirstChar(ent.packageName);

        if (ent.children.length === 0) {
          return [{
            short:'',
            long:nextVal
          }];
        }

        if (ent.entity) {
          strm = fs.createWriteStream(ent.filePath);
          strm.write(`package ${ent.packageName}\n\n`);
        }

        if (strm) {

          for (let v of ent.children) {
            strm.write(`import "./${v.packageName}"\n`)
          }

          strm.write('\n');
        }


        let names: Array<AllObj> = [];

        for (let v of ent.children) {
          loop(v).forEach(cn => {
            const name = nextVal + cn.long;
            console.log({name});
            names.push({
              short: cn.long,
              long: nextVal + cn.long
            });
            if (strm) {
              strm.write(`type ${cn.long} = ${v.packageName}.${cn.short}\n`);
            }
          });
        }

        if (strm) {
          strm.end();
        }

        return names;

      };

      loop(ent);

    });
  });

  interface Opts {
    spaceCount: number,
    isInterface: boolean,
    startEntity: boolean
  }

  const loop = function (dir: string, v: any, em: EntitiesMap, {spaceCount, startEntity, isInterface}: Opts) {

    if (Array.isArray(v)) {
      throw new Error('Got unexpected array object.');
    }

    q.push(cb => {

      const k = cp.spawn('bash');
      k.stdin.end(`mkdir -p "${dir}";`);

      k.once('exit', code => {

        if (code > 0) {
          throw new Error('Could not create dir.');
        }

        if (isInterface) {
          cb(null);
          return handleInterface(v, dir);
        }

        const space = new Array(spaceCount).fill(null).join(' ');
        spaceCount += 2;
        const isLiteral = v[type] !== true;

        for (let k of Object.keys(v)) {

          const rhs = <object>v[k];
          const fn = String(k).toLowerCase();
          const nextDir = path.resolve(dir, fn);
          const folderName = path.basename(nextDir);

          const ent: EntitiesMap = {
            name: k,
            fileName: folderName + '.go',
            packageName: folderName,
            filePath: path.resolve(nextDir, folderName + '.go'),
            children: [],
            entity: startEntity
          };

          if (!(rhs && typeof rhs === 'object')) {
            const val = getString(rhs, isLiteral);

            if (/[^a-zA-z0-9]/.test(k)) {
              k = `'${k}'`;
            }

            continue;
          }

          em.children.push(ent);

          let startStruct = false; // startEntity = false;

          try {
            startStruct = v[k][go.struct] === true;
          }
          catch (err) {
            // ignore
          }

          try {
            startEntity = startEntity || v[k][go.entity] === true;
          }
          catch (err) {
            // ignore
          }


          if (!startStruct) {
            loop(nextDir, rhs, ent, {spaceCount, isInterface: false, startEntity});
            continue;
          }


          loop(nextDir, rhs, ent, {spaceCount, isInterface: true, startEntity});

        }

        cb(null);
      });
    });

  };

  loop(root, input, ent, {spaceCount: 2, isInterface: false, startEntity: false});

};


const cwd = process.cwd();

if (path.basename(cwd) !== 'oredoc') {
  throw 'Not in the right cwd.';
}

const root = path.resolve(cwd, 'test/builds/go/src/one');
generate(root, path.resolve(cwd, 'test/builds/go/src/one/input.js'));
