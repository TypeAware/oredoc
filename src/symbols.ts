'use strict';

export const literal = Symbol('literal');
export const type = Symbol('type');
export const interfac = Symbol('typescript.interface');
export const struct = Symbol('golang.struct');
export const entity = Symbol('golang.entity'); // marks where to put an entity.go file that references all subtypes
export const inline = Symbol('inline.array');
export const simple = Symbol('simple.type.inference');
