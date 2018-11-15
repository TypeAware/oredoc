import * as express from 'express';
import {RequestHandler} from 'express';
import {DocGen, Entity, RouteMulti} from '../dist/main';
import {Entities} from '../dist/types';

const router = express.Router();
const doc = new DocGen();

export const register = (v: any) => {
  const entity = doc.createAndAddEntity('foo');
  router.get('/', makeGetFoo(v, entity));
  router.put('/', makePutFoo(v, entity));
};


const makeGetFoo = (v: any, e: Entity): RequestHandler => {
  
  type Req = Entities.Foo.PUT.Basic.Req;
  type Res = Entities.Foo.PUT.Basic.Res;
  
  const r = new RouteMulti({
    headers: <Req['headers']>{},
    body: <Req['body']>{}
  }, {
    body: <Res['body']>{
      foo: 5
    }
  });
  
  
  type SuccessResponse = typeof r.res.body;
  
  e.addRoute({
    path: '',
    example: r
  });
  
  return (req, res, next) => {
    
    const headers = req.headers.foo;
    
    res.json(<SuccessResponse> {foo: 4});
    
  };
  
};

const makePutFoo = (v: any, e: Entity): RequestHandler => {
  
  interface Response {
  
  }
  
  return (req, res, next) => {
    
    res.json(<Response>{success: 'f'});
    
  };
  
};


