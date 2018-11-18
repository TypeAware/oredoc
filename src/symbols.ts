'use strict';

export const literal = Symbol('literal');
export const type = Symbol('type');
export const inline = Symbol('inline.array');
export const simple = Symbol('simple.type.inference');


export const go = {
  struct: Symbol('golang.struct'),
  entity: Symbol('golang.entity') // marks where to put an entity.go file that references all subtypes
};

export const ts = {
  interface: Symbol('typescript.interface')
};
