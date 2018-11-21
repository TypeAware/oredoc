'use strict';

import * as path from 'path';
import * as assert from 'assert';
import {ts, literal, simple, optional, typeMap, typeOptions, typeLink} from '../symbols';
import {defaultBoolean, defaultInt, defaultString, defaultArrayType, defaultObject} from "../defaults";
import {joinMessages} from '../main';
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


    for (let k of Object.keys(v)) {

      const rhs = v[k];
      const type = typeof rhs;

      if (!(rhs && typeof rhs === 'object')) {

        result.push(space + `${k}: '${rhs}',`);
        continue;
      }

      if(rhs[typeLink] === true){
        {
          const val = rhs.link;
          result.push(space + `${k}: ${val},`);
        }
        continue;
      }

      if (rhs[typeMap] === true) {
        {
          const val = getString(rhs);
          result.push(space + `${k}: ${val},`);
        }
        continue;
      }

      if (rhs[typeOptions] === true) {
        {
          const elab = rhs.elab;

          if (!elab) {
            throw new Error('no elab ' + util.inspect(rhs));
          }

          if (elab.type) {
            const val = getString(elab);
            result.push(space + `${k}: ${val},`);
          }
          else if (elab.link) {
            result.push(space + `${k}: ${elab.link},`);
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
          else if(firstElem[typeMap] === true){
            const literalType = (<any>firstElem)['typescript'];
            result.push(space + `${k}: Array<${literalType}>`);
          }
          else if ((<any>rhs)[literal] === true) {
            const literalType = rhs.reverse().reduce((a, b) => {
              return [b, '<', a, '>'].join('');
            });
            result.push(space + `${k}: Array<${literalType}>,`);
          }
          else if ((<any>rhs)[typeMap] === true) {  // (<any>rhs)[simple] === true
            const literalType = (<any>rhs)['typescript'];
            result.push(space + `${k}: Array<${literalType}>`);
          }
          else {
            console.error('Creating default object type:', rhs);
            const literalType = (<any>defaultObject)['typescript'];
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
        startInterface = v[k][ts.interface] === true;
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
