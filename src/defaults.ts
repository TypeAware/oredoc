

// export enum defaultNumber  {
//   'golang' = 'float32',
//   'java' = 'double',
//   'typescript' = 'number'
// }
//
// export enum defaultInt {
//   'golang'= 'int',
//   'java'= 'int',
//   'typescript' = 'number'
// }
//
// export enum defaultString  {
//   'golang' = 'string',
//   'java' = 'String',
//   'typescript' = 'string'
// }
//
// export enum defaultBoolean {
//   'golang' = 'bool',
//   'java' = 'boolean',
//   'typescript' = 'boolean'
// }

 const defaultNumber1 = {
  'golang': 'float32',
  'java': 'double',
  'typescript': 'number'
};

export const defaultNumber = <typeof defaultNumber1>defaultNumber1;

export const defaultInt1 = {
  'golang': 'int',
  'java': 'int',
  'typescript': 'number'
};

export const defaultInt = defaultInt1 as typeof defaultInt1;

export const defaultString = {
  'golang': 'string',
  'java': 'String',
  'typescript': 'string'
};

export const defaultBoolean = {
  'golang': 'bool',
  'java': 'boolean',
  'typescript': 'boolean'
};




export const defaultObject = {
  'golang': 'struct {}',
  'java': `Object`,
  'typescript': '{}'
};


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
