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
  response:{
    success: {
    
    },
    error: {
    
    }
  }
}


export interface Entity {
  name: string,
  routes: {
    [key:string]: RouteInfo
  }
}

export interface Info {
  miscRoutes: {
    [key:string]: RouteInfo
  },
  entities: {
  
  }
}


export class DocGen {

  filePath: '';
  info: Info;
  
  constructor(){
    this.info = {
      entities: {},
      miscRoutes:{}
    };
  }
  
  createEntity(name: string): Entity{
    return {
      name,
      routes:{}
    }
  }
  
  addEntity(): this {
  
    return this;
  }
  
  addMiscRoute(v: RouteInfo): this {
  
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


