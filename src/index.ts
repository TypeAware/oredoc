'use strict';

import * as express from 'express';
import {RequestHandler} from 'express';
import log from './logger';
import * as safe from '@oresoftware/safe-stringify';
import chalk from 'chalk';
import {RouteBase} from '../dist';

export const r2gSmokeTest = function () {
  // r2g command line app uses this exported function
  return true;
};

export interface Headers {
  [key: string]: string
}

export interface Request {
  headers?: Headers;
  body?:  any;
  queryParams?: {
    [key: string]: string
  };
  parsedQueryParams?: {
    [key: string]: any
  }
}

export interface Response {
  headers?: Headers;
  body?:{
    success?: any,
    error?: any
  };
}

export interface RouteBase {
  request: Request,
  response: Response,
}

export interface RouteInfo {
  path: string,
  // request: Request,
  // response: Response,
  example?: {
    response: Response,
    request: Request
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
  
  addRoute<R = RouteBase>(v: RouteInfo): this {
    
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



export class Route<T extends RouteBase>  {
  
  info: T;
  
  constructor(v: T) {
    this.info = Object.assign(<RouteBase>{
      request:{
        headers:{},
        queryParams:{},
        parsedQueryParams:{},
        body:{
          success:{},
          error:{}
        }
      },
      response:{
        headers:{},
        body:{
          success:{},
          error:{}
        }
      }
    }, v);
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
    
    const entity = this.createEntity(name,routes);
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


