'use strict';

import * as express from 'express';
import {RequestHandler} from 'express';
import log from './logger';
import * as safe from '@oresoftware/safe-stringify';
import chalk from 'chalk';
import * as symbols from './symbols';

export {symbols};

import * as defaults from './defaults';
import * as util from "util";
import * as assert from "assert";
import {LangMap} from "./utils";

export {defaults};


export const set = (...args: any[]) => {
  const o = args.pop();
  if (!(o && typeof o === 'object')) {
    throw new Error('Final argument must be a non-array object.');
  }
  if (Array.isArray(o)) {
    throw new Error('Final argument must be a non-array object.');
  }
  for (let v of args) {
    if (typeof v !== 'symbol') {
      throw new Error('Value should be a Symbol, but isnt: ' + v);
    }
    o[v] = true;
  }
  return o;
};

export enum Langs {
  GOLANG = 'golang',
  TYPESCRIPT = 'typescript',
  SWIFT = 'swift',
  JAVA = 'java'
}

export const joinMessages = (...args: string[]) => {
  return args.join(' ');
};


export const setLink = function (...args: any[]) : {elab: TypeElaboration} {

  const typeString = args.pop();
  assert.equal(typeof  typeString, 'string', 'type link must be a string');

  const ret = <any>{
    [symbols.typeLink]: true,
    link: typeString,
    value: null as string
  };

  for (let s of args) {
    ret[s] = true;
  }

  return ret;

};


export interface TypeElaboration {
  [key: string]: any,

  type: Partial<LangMap>,
  optional?: boolean,
  required?: boolean,
  link?: string,
  linkfn?: () => object,
  compound?: Array<Partial<LangMap>>
  value?: string,
  fromField?: string,
  toField?: string
}

const checkForMoreThanOne = (list: Array<any>): boolean => {
   return list.filter(Boolean).length > 1;
};

export const setType = function (...args: any[]) : {elab: TypeElaboration} {

  const v = <TypeElaboration>args.pop();

  assert(v && typeof v === 'object', 'Argument must be a non-array object.');
  assert(!Array.isArray(v), 'Argument must be a non-array object.');

  if ((v as any)[symbols.typeMap]) {
    return simpleType.apply(null, args);
  }

  if(v.type){
    assert.equal(
      (v.type as any)[symbols.typeMap],
      true,
      'Object must have a property "type" which points to an object with a typeMap/Symbol property.'
    );
  }

  if(v.link){
    assert.equal(typeof v.link, 'string', '"link" property must be a string.');
  }
  
  if(v.linkfn){
    assert.equal(typeof v.linkfn, 'function', '"linkfn" property must be a function.');
  }

  assert(v.link || v.type || v.compound || v.linkfn, 'You must provide a "link" or "type" - you provided neither.');
  
  assert(
    !checkForMoreThanOne([v.link, v.type, v.compound, v.linkfn]),
    'You must choose either a "link" or "type" to use - you provided both.'
  );

  if ('value' in v) {
    assert.equal(typeof v.value, 'string', '"value" field must be a string type.');
  }

  const ret = <any>{
    [symbols.typeOptions]: true,
    elab: Object.assign({}, v)
  };

  for (let s of args) {
    ret[s] = true;
  }

  return ret;

};


// symbols: Array<Symbol>, z: Partial<LangMap>
export const simpleType = function (...args: any[]) {

  const v = args.pop();

  assert(v && typeof v === 'object', 'Argument must be a non-array object.');
  assert(Array.isArray(v), 'Argument must be a non-array object.');

  for (let k of Object.keys(v)) {
    if (!(Langs as any)[k]) {
      throw new Error(`The following key is not a recognized language: "${k}" - here are the recognized languages: ${util.inspect(Langs)}`)
    }
    let value = v[k];
    if (typeof value !== 'string') {
      throw new Error(`The following object has a key "${k}" that does not point to a string: ` + util.inspect(value));
    }
  }

  const ret = <any>{
    [symbols.typeMap]: true,
    map: Object.assign({}, v)
  };

  for (let s of args) {
    ret[s] = true;
  }

  return ret;
};


export const r2gSmokeTest = function () {
  // r2g command line app uses this exported function
  return true;
};



