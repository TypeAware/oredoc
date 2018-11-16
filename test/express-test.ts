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
  
  type Req = Entities.Foo.GET.Basic.Req;
  type Res = Entities.Foo.GET.Basic.Res;
  
  return (req, res, next) => {
    
    const body = <Req['body']>req.body;
    const headers = req.headers.foo;
    
    res.json(<Res['body']> {foo1: 4});
    
  };
  
};

const makePutFoo = (v: any, e: Entity): RequestHandler => {
  
  type Req = Entities.Foo.PUT.Basic.Req;
  type Res = Entities.Foo.PUT.Basic.Res;
  
  
  return (req, res, next) => {
    
    const headers = req.headers.foo;
    
    res.json(<Res['body']>{foo: 5});
    
  };
  
};


