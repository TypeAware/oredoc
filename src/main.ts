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

interface StringKV {
  [key: string]: string
}

interface LangMap {
  [key: string]: string,

  golang: string,
  typescript: string,
  java: string,
  swift: string
}


export const typeLink = function (...args: any[]) {
  const typeString = args.pop();
  assert.equal(typeof  typeString, 'string', 'type link must be a string');

  return {
    [symbols.typeLink]: true,
    link: typeString,
    value: null as string
  }
};


export const setType = function (...args: any[]) {

  const v = args.pop();

  assert(v && typeof v === 'object', 'Argument must be a non-array object.');
  assert(Array.isArray(v), 'Argument must be a non-array object.');


  if (v[symbols.typeMap]) {
    return simpleType.apply(null, args);
  }


  assert.equal(
    v.type[symbols.typeMap],
    true,
    'Object must have a property "type" which points to an object with a typeMap/Symbol property.'
  )


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

  if (arguments.length > 1) {
    throw new Error(simpleType.name + ' requires 1 argument only.');
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

export const setArray = (...args: any[]) => {
  const o = args.pop();
  if (!Array.isArray(o)) {
    throw new Error('Final argument must be an array.');
  }
  for (let v of args) {

    if (typeof v !== 'symbol') {
      throw new Error('Value should be a Symbol, but isnt: ' + v);
    }

    (o as any)[v] = true;
  }
  return o;
};

export const setTypeMap = (v: object) => {

};

export const setTypeString = (t: string, val?: string) => {
  return {
    [symbols.type]: true,
    type: t,
    val: val
  }
};


export const r2gSmokeTest = function () {
  // r2g command line app uses this exported function
  return true;
};

export interface Headers {
  [key: string]: string
}

export interface Request {
  headers?: Headers;
  body?: any;
  queryParams?: {
    [key: string]: string
  };
  parsedQueryParams?: {
    [key: string]: any
  }
}

export interface Response {
  headers?: Headers;
  body?: any;
}

export interface RouteBase {
  req: Request,
  res: Response,
}

export interface RouteBaseMulti {
  req: Request,
  res: Response,
}

export interface RouteInfo {
  path: string,
  example: {
    res: Response,
    req: Request
  }
}

export interface RouteMap {
  [key: string]: RouteInfo
}

export class Entity {

  name: string;
  routes: RouteMap;

  constructor(name: string, routes?: RouteMap) {
    this.name = name;
    this.routes = routes || {};
  }

  addRoute(v: RouteInfo): this {

    if (this.routes[v.path]) {
      throw new Error(
        joinMessages(
          'OreDoc entity with name', chalk.bold(this.name), 'already has a  route with path:', chalk.bold(v.path)
        )
      );
    }

    this.routes[v.path] = v;
    return this;
  }

  attachTo(d: DocGen): this {
    d.addEntity(this);
    return this;
  }
}

export interface Info {
  miscRoutes: {
    [key: string]: RouteInfo
  },
  entities: {
    [key: string]: Entity
  }
}

export const joinMessages = (...args: string[]) => {
  return args.join(' ');
};


export class RouteMulti<Req extends Request, Res extends Response> {

  req: Req;
  res: Res;

  constructor(req: Req, res: Res) {

    this.req = (<any>Object).assign({
      headers: {},
      queryParams: {},
      parsedQueryParams: {},
      body: {}
    }, req);

    this.res = (<any>Object).assign({
      headers: {},
      body: {}
    }, res);

  }
}


export class DocGen {

  filePath: '';
  info: Info;

  constructor() {
    this.info = {
      entities: {},
      miscRoutes: {}
    };
  }


  createEntity(name: string, routes?: RouteMap): Entity {
    return new Entity(
      name,
      routes
    )
  }

  createAndAddEntity(name: string, routes?: RouteMap): Entity {

    if (this.info.entities[name]) {
      throw new Error(joinMessages('OreDoc already has an entity with name:', name));
    }

    const entity = this.createEntity(name, routes);
    this.info.entities[entity.name] = entity;
    return entity;
  }

  addEntity(v: Entity): this {

    if (this.info.entities[v.name]) {
      throw new Error(joinMessages('OreDoc already has an entity with name:', v.name));
    }

    this.info.entities[v.name] = v;
    return this;
  }

  addMiscRoute(v: RouteInfo): this {

    if (this.info.miscRoutes[v.path]) {
      throw new Error(joinMessages('OreDoc already has a misc route with path:', v.path));
    }

    this.info.miscRoutes[v.path] = v;
    return this;
  }

  addRoute(entity: string, v: RouteInfo): this {

    return this;
  }

  serialize(): string {
    return safe.stringify(this.info);
  }

  serve(): RequestHandler {

    return (req, res, next) => {

      try {
        res.json(this.info);
      }
      catch (err) {
        log.error(err);
        next(err);
      }

    }
  }

}


