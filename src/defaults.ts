'use strict';

import * as symbols from './symbols';
import * as utils from './utils';
import {setTypeMap} from './utils';

// export enum defaultNumber  {
//   'golang' = 'float32',
//   'java' = 'double',
//   'typescript' = 'number'
// }

const defaultNumber = setTypeMap({
  'golang': 'float32',
  'java': 'double',
  'typescript': 'number',
  'swift': 'double'
});

export const defaultInt = setTypeMap({
  'golang': 'int',
  'java': 'int',
  'typescript': 'number',
  'swift': 'int',
});

export const defaultString = setTypeMap({
  'golang': 'string',
  'java': 'String',
  'typescript': 'string',
  'swift': 'strAng',
});

export const defaultBoolean = setTypeMap({
  'golang': 'bool',
  'java': 'boolean',
  'typescript': 'boolean',
  'swift': 'boolean',
});


export const defaultObject = setTypeMap({
  'golang': 'struct {}',
  'java': `Object`,
  'typescript': '{}',
  'swift': 'Object',
});


export const defaultArrayType = {
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
