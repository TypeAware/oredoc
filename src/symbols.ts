'use strict';

export const literal = Symbol('literal');
export const type = Symbol('type');
export const inline = Symbol('inline.array');
export const simple = Symbol('simple.type.inference');
export const extend = Symbol('generic.extends.keyword');
export const imports = Symbol('generic.imports.keyword');
export const optional = Symbol('generic.optional.field');

export const typeLink = Symbol('generic.type.link');

export const typeVal = Symbol('type.value');
export const typeMap = Symbol('type.map');  // user provides custom object, mapping a language to a type

export const go = {
  struct: Symbol('golang.struct'),
  file: Symbol('golang.file'),  // put all these things in multiple structs in a golang file
  entity: Symbol('golang.entity') // marks where to put an entity.go file that references all subtypes
};

export const ts = {
  interface: Symbol('typescript.interface')
};


export const swift = {
  struct:  Symbol('swift.struct'),
  extension: Symbol('swift.extension'),
  class: Symbol('swift.class')
};
