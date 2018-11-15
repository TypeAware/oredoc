#!/usr/bin/env node

import * as cp from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import * as assert from 'assert';
import * as EE from 'events';
import * as strm from "stream";


const fdec = function(target:any, field: any, desc: any){
  console.log('target 0 :', target);
  target.bar = 3;
  return target;
};

const fdec2 = function(){
  return function(target:any, field: any, desc: any){
    console.log({target, field, desc});
    target.bar = 3;
    return target;
  }
};

////

// @fdec
class Foo {
  @fdec2()
  static bar: number
}


console.log(Foo.bar)
const v = new Foo();
v.constructor = 3;
console.log(v.constructor.bar);
console.log(v.constructor.bar);
console.log(v.constructor.bar);
