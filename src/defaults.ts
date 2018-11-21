'use strict';

import * as symbols from './symbols';
import * as utils from './utils';

// export enum defaultNumber  {
//   'golang' = 'float32',
//   'java' = 'double',
//   'typescript' = 'number'
// }

const defaultNumber = {
  [symbols.typeMap]: true,
  'golang': 'float32',
  'java': 'double',
  'typescript': 'number',
  'swift': 'double'
};

export const defaultInt = {
  [symbols.typeMap]: true,
  'golang': 'int',
  'java': 'int',
  'typescript': 'number',
  'swift': 'int',
};

export const defaultString = {
  [symbols.typeMap]: true,
  'golang': 'string',
  'java': 'String',
  'typescript': 'string'
};

export const defaultBoolean = {
  [symbols.typeMap]: true,
  'golang': 'bool',
  'java': 'boolean',
  'typescript': 'boolean'
};


export const defaultObject = {
  [symbols.typeMap]: true,
  'golang': 'struct {}',
  'java': `Object`,
  'typescript': '{}'
};


export const defaultArrayType = {
  [symbols.typeMap]: true,
  'string': defaultString,
  'boolean': defaultBoolean,
  'number': defaultNumber,
  'object': defaultObject
};


Object.defineProperty(defaultArrayType, 'undefined', {
  get() {
    throw new Error('Array cannot contain an <undefined> element.');
  }
});

Object.defineProperty(defaultArrayType, 'symbol', {
  get() {
    throw new Error('Array cannot contain a <Symbol> element.');
  }
});
