'use strict';


import {symbols} from './main';

export interface LangMap {
  [key: string]: string | true,
  
  golang: string,
  typescript: string,
  java: string,
  swift: string
}

const typeMapPrototype = {
  toString() {
    return '<symbols.TypeMap>'
  }
};

export const setTypeMap = function (v: LangMap): LangMap {
  (v as any)[symbols.typeMap] = true; // TODO
  return Object.setPrototypeOf(v, typeMapPrototype);
};

export const setTypeMapX = function (v: LangMap): LangMap {
  return Object.setPrototypeOf(
    Object.assign({}, v, {[symbols.typeMap]: true}),
    typeMapPrototype
  );
};

abstract class LangHelper {
  abstract createString(s: string): string
}

export class JavaLangHelper extends LangHelper {
  createString(s: string) {
    return `"${s}"`;
  }
}

const classes = {
  java: new JavaLangHelper()
};


