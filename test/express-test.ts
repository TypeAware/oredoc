import * as express from 'express';
import {RequestHandler} from 'express';
// import {DocGen, Entity, RouteMulti} from '../dist/original';
import {DocGen, Entity} from '../dist/doc-gen';
import {Entities} from '../dist/types';
import Foo = Entities.Foo;
import {Route} from "../src/doc-gen";

const router = express.Router();
type HTTPMethods = 'put' | 'get' | 'head' | 'post' | 'delete';

const makeAddRoute = function (router: any, inject: any, entityName: string, d: DocGen) {
  return function addRoute(f: any, methods: Array<HTTPMethods>, route: string) {
    
    const r = d.createAndAddRoute(methods,route);
    const handler = f();
    for (let v of methods) {
      (router as any)[v as any](route, handler);
    }
  }
  
};

export const register = (v: any, d: DocGen) => {
  // router.get('/', makeGetFoo(v, d));
  // router.put('/', makePutFoo(v, d));
  
  const addRoute = makeAddRoute(router, v, 'dogs', d);
  addRoute(makeGetFoo, ['get'], '/');
};


export class FooZ {

}


type F = FooZ;



const makeGetFoo = (v: any, x: Route): RequestHandler => {
  
  // type Req =  x.setRequestType();
  // type Req =  typeof (x.setRequestBodyType(Foo.GET.Basic.Req));
  
  type Res = Foo.GET.Basic.Res;
  type Req = Foo.GET.Basic.Req;
  
  // type Req =  Req1;
  // type Res =  Res1;
  
  const z = x.setResponseBodyType(Foo.GET.Basic.Req);
  
  
  // x.setRequestBodyType(Foo.GET.Basic.Req);
  // // x.setResponseBodyType(Res1);
  // x.setRequestBodyType(Foo.GET.Basic.Req);
  
  return (req, res, next) => {
    
    const body: Req['body'] = req.body;
    const headers = req.headers.foo;
    
    res.json(<Res['body']>{foo1: 4});
    
  };
  
};

const makePutFoo = (v: any, e: DocGen): RequestHandler => {
  
  type Req = Entities.Foo.PUT.Basic.Req;
  type Res = Entities.Foo.PUT.Basic.Res;
  
  return (req, res, next) => {
    
    const headers = req.headers.foo;
    
    res.json(<Res['body']>{foo: 5});
    
  };
  
};

register(
  {},
  new DocGen()
);

