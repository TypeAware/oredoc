#!/usr/bin/env node

import * as cp from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import * as assert from 'assert';
import * as EE from 'events';
import * as strm from "stream";


interface Foo {
  bar:{
    star: {
    
    }
  }
}

type T = Foo['bar']['star'];

const v: T = [];

