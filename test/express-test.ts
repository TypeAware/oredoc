import * as express from 'express';
import {RequestHandler} from 'express';
import {DocGen, Entity} from '../dist';
import {Route, RouteBase} from '../src';

const router = express.Router();
const doc = new DocGen();

export const register = (v: any) => {
  const entity = doc.createAndAddEntity('foo');
  router.get('/', makeGetFoo(v, entity));
  router.put('/', makePutFoo(v, entity));
};

const makeGetFoo = (v: any, e: Entity): RequestHandler => {
  
  const r = new Route({
    request: {
      headers:{
      
      }
    },
    response:{
      body: {
        success: {
          foo: 'yes'
        }
      }
    }
  });
  
  
  type SuccessResponse = typeof r.info.response.body.success;
  
  e.addRoute<typeof r.info>({
    path: '',
    example: r.info
  });
  
  return (req, res, next) => {
  
  
    const headers = req.headers.foo;
  
    res.json(<SuccessResponse> {foo:''});
    
  };
  
};

const makePutFoo = (v: any, e: Entity): RequestHandler => {
  
  interface Response {
  
  }
  
  return (req, res, next) => {
    
    res.json(<Response>{success: 'f'});
    
  };
  
};


