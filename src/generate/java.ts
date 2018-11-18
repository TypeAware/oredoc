import * as path from 'path';
import * as assert from 'assert';
import {interfac, type, literal} from '../symbols';
import {joinMessages} from '../main';
import {defaultBoolean, defaultInt, defaultString} from "../defaults";

const getString = (v: any, isLiteral: boolean) => {

  if (v === defaultInt) {
    return defaultInt['java'];
  }

  if (v === defaultString) {
    return defaultString['java'];
  }

  if (v === defaultBoolean) {
    return defaultBoolean['java'];
  }

  if (v && typeof v === 'object') {
    return v['java'];
  }

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
      return 'boolean';
    }
    if (v === 'number') {
      return 'number';
    }

  }

  if (typeof v === 'number') {
    return isLiteral ? v : 'number';
  }

  console.error('type not recognized:', v);
  return v;

};

const hasDefault = (v: any) => {
  return [
    defaultBoolean,
    defaultInt,
    defaultString
  ].includes(v);
};

export const generate = (src: string) => {

  const input = require(src);
  assert(input.entities, 'no entities exported from .js file.');

  const result: Array<string> = [
    'public class Entities {'
  ];

  const loop = function (v: any, spaceCount: number, withinInterface: boolean) {

    if (Array.isArray(v)) {
      throw new Error('Got unexpected array object.');
    }

    const space = new Array(spaceCount).fill(null).join(' ');
    const isLiteral = v[type] !== true;

    for (let k of Object.keys(v)) {

      const rhs = v[k];

      if (hasDefault(rhs) || !(rhs && typeof rhs === 'object')) {
        const val = getString(rhs, isLiteral);

        if (/[^a-zA-z0-9]/.test(k)) {
          k = `'${k}'`;
        }

        if (isLiteral) {
          if (typeof rhs === 'boolean') {
            result.push(space + `boolean ${k} = ${val};`);
          }
          else if (typeof rhs === 'string') {
            result.push(space + `String ${k} = ${val};`);
          }
          else {
            result.push(space + `double  ${k} = ${val};`);
          }
          continue;
        }

        result.push(space + `${val} ${k};`);
        continue;
      }

      // if (withinInterface) {
      //   console.error('we are witin interface.');
      //   result.push(space + `${k}: {`);
      //   loop(v[k], spaceCount + 2, true);
      //   result.push(space + '}');
      //   continue;
      // }


      if (!isLiteral && Array.isArray(rhs)) {

        {
          const [type, value] = rhs;
          const literalType = getString(type, isLiteral);

          if (/[^a-zA-z0-9]/.test(k)) {
            k = `'${k}'`;
          }

          if (value === undefined) { // TODO: check array length instead of for undefined
            result.push(space + `${literalType} ${k};`);
          }
          else {
            result.push(space + `${literalType} ${k} = ${value};`);
          }

        }
        continue;
      }


      if (!isLiteral) {
        throw 'fark'
      }


      let startInterface = false;

      try {
        startInterface = v[k][interfac] === true;
      }
      catch (err) {
        // ignore
      }

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
