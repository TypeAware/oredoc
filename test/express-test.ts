import * as express from 'express';
import {RequestHandler} from 'express';
import {DocGen, Entity} from '../dist';

const router = express.Router();
const doc = new DocGen();

export const register = (v: any) => {
  const entity = doc.createAndAddEntity('foo');
  router.get('/', makeGetFoo(v, entity));
  router.put('/', makePutFoo(v, entity));
};

const makeGetFoo = (v: any, e: Entity): RequestHandler => {
  
  interface Request {
  
  }
  
  interface Response {
  
  }
  
  e.addRoute<Response, Request>({
    path: ''
  })
  
  return (req, res, next) => {
    
    res.json(<Response>{success: true});
    
  };
  
};

const makePutFoo = (v: any, e: Entity): RequestHandler => {
  
  interface Response {
  
  }
  
  return (req, res, next) => {
    
    res.json(<Response>{success: 'f'});
    
  };
  
};


