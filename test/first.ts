#!/usr/bin/env node

interface Foo {
  foo1: string,
  foo2: number,
  foo3: boolean
}


const v = <Foo>{foo1: '4'};
