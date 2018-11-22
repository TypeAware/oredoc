'use strict';

// TODO: all these symbols should be uppercase first char

export const literal = Symbol('literal');
export const type = Symbol('type');

/*

        zoom: setArray(inline, [
          {dog: defaultString, pig: defaultBoolean, roop:[{}]}
        ]),
        boom: setArray(inline, [defaultString]),
        toom: setArray(inline, [
          []
        ]),

*/

export const simple = Symbol('simple.type.inference');
export const extend = Symbol('generic.extends.keyword');
export const imports = Symbol('generic.imports.keyword');
export const optional = Symbol('generic.optional.field');

export const typeLink = Symbol('generic.type.link');
export const LinkfnVal = Symbol('linkfn.value');

export const NamespaceName = Symbol('NamespaceName');

export const typeOptions = Symbol('type.options');

export const typeVal = Symbol('type.value');
export const typeMap = Symbol('type.map');  // user provides custom object, mapping a language to a type

export const go = {
  struct: Symbol('golang.struct'),
  file: Symbol('golang.file'),  // put all these things in multiple structs in a golang file
  entity: Symbol('golang.entity') // marks where to put an entity.go file that references all subtypes
};

export const ts = {
  inline: Symbol('typescript.inline'), // inline a type
  interface: Symbol('typescript.interface'),
  class: Symbol('typescript.class')
};


export const swift = {
  struct:  Symbol('swift.struct'),
  extension: Symbol('swift.extension'),
  class: Symbol('swift.class')
};


export const chld = {
  literal: Symbol('children.literal.type')

};
