'use strict';

import * as express from 'express';
import {RequestHandler} from 'express';
import log from './logger';

export const r2gSmokeTest = function () {
  // r2g command line app uses this exported function
  return true;
};


export interface RouteInfo {
  path: string,
  queryParams?: {
    [key: string]: string
  },
  parsedQueryParams?: {
    [key:string]: any
  },
  response:{
    success: any,
    error: any
  },
  example:{
    response:{
      success: any,
      error: any
    }
  }
}

export interface RouteMap {
  [key:string]: RouteInfo
}


export class Entity {
  
  name: string;
  routes: RouteMap;
  
  constructor(name: string, routes?: RouteMap){
    this.name = name;
    this.routes = routes || {};
  }
}

export interface Info {
  miscRoutes: {
    [key:string]: RouteInfo
  },
  entities: {
    [key: string]: Entity
  }
}

export const joinMessages = (...args: string[]) => {
  return args.join(' ');
};


export class DocGen {

  filePath: '';
  info: Info;
  
  constructor(){
    this.info = {
      entities: {},
      miscRoutes:{}
    };
  }
  
  createEntity(name: string, routes?: RouteMap): Entity{
    return new Entity(
      name,
      routes
    )
  }
  
  addEntity(v: Entity): this {
  
    if(this.info.miscRoutes[v.name]){
      throw new Error(joinMessages('OreDoc already has a misc route with path:',v.name));
    }
  
    this.info.entities[v.name] = v;
    return this;
  }
  
  addMiscRoute(v: RouteInfo): this {
    
    if(this.info.miscRoutes[v.path]){
      throw new Error(joinMessages('OreDoc already has a misc route with path:',v.path));
    }
  
    return this;
  }
  
  addRoute(entity: string, v: RouteInfo) : this {
  
    return this;
  }
  
  
  serve(): RequestHandler {
  
    return (req,res,next) => {
      
      try{
        res.json(this.info);
      }
      catch(err){
        log.error(err);
        next(err);
      }
      
    }
  }
  
  
  
  
}


