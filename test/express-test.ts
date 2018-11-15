import * as express from 'express';
import {RequestHandler} from 'express';
import {DocGen, Entity} from '../dist';
import {RouteBase} from '../src';

const router = express.Router();
const doc = new DocGen();

export const register = (v: any) => {
  const entity = doc.createAndAddEntity('foo');
  router.get('/', makeGetFoo(v, entity));
  router.put('/', makePutFoo(v, entity));
};

const makeGetFoo = (v: any, e: Entity): RequestHandler => {
  
  const example = {
    request: {},
    response:{}
  };
  
  interface Route extends RouteBase {
    response: typeof example.response
    request: typeof example.request
  }
  
  
  e.addRoute<Route>({
    path: ''
  });
  
  return (req, res, next) => {
    
    res.json(<Route['response']>{success: true});
    
  };
  
};

const makePutFoo = (v: any, e: Entity): RequestHandler => {
  
  interface Response {
  
  }
  
  return (req, res, next) => {
    
    res.json(<Response>{success: 'f'});
    
  };
  
};


