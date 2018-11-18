import * as path from 'path';
import * as assert from 'assert';
import {interfac, type, literal, inline, simple} from '../symbols';
import {defaultBoolean, defaultInt, defaultString, defaultArrayType} from "../defaults";
import {joinMessages} from '../main';

const getString = (v: any, isLiteral: boolean) => {

  if (v === defaultInt) {
    return defaultInt['typescript'];
  }

  if (v === defaultString) {
    return defaultString['typescript'];
  }

  if (v === defaultBoolean) {
    return defaultBoolean['typescript'];
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

  throw new Error(joinMessages('primitive not recognized:', v, typeof v));
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
    'export namespace Entities {'
  ];

  const loop = function (v: any, spaceCount: number, withinInterface: boolean) {

    if (Array.isArray(v)) {
      console.error('we have an array:', v);
      return result.push('Array<any>')
    }

    const space = new Array(spaceCount).fill(null).join(' ');
    spaceCount += 2;

    const isLiteral = v[type] !== true;

    for (let k of Object.keys(v)) {

      const rhs = v[k];

      if (hasDefault(rhs) || !isLiteral || !(v[k] && typeof v[k] === 'object')) {
        const val = getString(v[k], isLiteral);

        if (/[^a-zA-z0-9]/.test(k)) {
          k = `'${k}'`;
        }

        result.push(space + `${k}: ${val},`);
        continue;
      }

      if (Array.isArray(rhs)) {
        {

          const type = typeof rhs[0];

          if ((<any>rhs)[inline] === true) {

            const firstElem = rhs[0];
            if (Array.isArray(firstElem)) {
              result.push(space + `${k}: Array<Array<any>>`);
            }
            else if (hasDefault(firstElem)) {
              result.push(space + `${k}: Array<${getString(firstElem, isLiteral)}>`);
            }
            else if (firstElem && typeof firstElem === 'object') {
              result.push(space + `${k}: Array<{`);
              loop(firstElem, spaceCount, true);
              result.push(space + '}>');
            }
            else {
              const literalType = (<any>defaultArrayType)[firstElem]['typescript'];
              result.push(space + `${k}: Array<${literalType}>`);
            }

          }
          else if ((<any>rhs)[literal] === true) {
            const literalType = rhs.reverse().reduce((a, b) => {
              return [b, '<', a, '>'].join('');
            });
            result.push(space + `${k}: Array<${literalType}>,`);
          }
          else {  // (<any>rhs)[simple] === true
            const literalType = (<any>defaultArrayType)[type]['typescript'];
            result.push(space + `${k}: Array<${literalType}>`);
          }
        }

        continue;
      }

      if (withinInterface) {
        result.push(space + `${k}: {`);
        loop(v[k], spaceCount, true);
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

      loop(v[k], spaceCount, startInterface);
      result.push(space + '}');

    }

  };

  loop(input.entities, 2, false);
  console.log(result.join('\n') + '\n}')

};

const f = process.env.input_file;
generate(path.resolve(f));
