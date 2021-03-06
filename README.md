

### OreDoc: @oresoftware/doc & oredoc


To use OreDoc, you would write code resembling:


```typescript
import * as express from 'express';
import {RequestHandler} from 'express';
import {DocGen, Entity, Route, RouteBase, RouteMulti} from '../dist/main';

const router = express.Router();
const doc = new DocGen();

export const register = (v: any) => {
  const entity = doc.createAndAddEntity('foo');
  router.get('/', makeGetFoo(v, entity));
  router.put('/', makePutFoo(v, entity));
};


const makeGetFoo = (v: any, e: Entity): RequestHandler => {
  
  const r = new RouteMulti({
    headers: {},
    body: {}
  }, {
    body: {
      success: {
        foo: 'yes'
      }
    }
  });
  
  //
  
  type SuccessResponse = typeof r.res.body.success;
  
  e.addRoute({
    path: '',
    example: r
  });
  
  return (req, res, next) => {
    
    const headers = req.headers.foo;
    
    res.json(<SuccessResponse> {foo: ''});
    
  };
  
};

const makePutFoo = (v: any, e: Entity): RequestHandler => {
  
  interface Response {
  
  }
  
  return (req, res, next) => {
    
    res.json(<Response>{success: 'f'});
    
  };
  
};




```
