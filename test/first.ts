#!/usr/bin/env node

import * as cp from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import * as assert from 'assert';
import * as EE from 'events';
import * as strm from "stream";


const fdec = function(target:any, field: any, desc: any){
  console.log('target:', target);
  target.bar = 3;
};

const fdec2 = function(){
  console.log('target 1:');
  return function(target:any, field: any, desc: any){
    console.log('target:', target);
    target.bar = 3;
  }
};

fdec
fdec2()
class Foo {
  
  static bar: number

}


console.log(Foo.bar);
console.log(new Foo());
