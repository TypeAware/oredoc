export const defaultNumber = {
  'golang': 'float32',
  'java': 'double',
  'typescript': 'number'
};

export const defaultInt = {
  'golang': 'int',
  'java': 'int',
  'typescript': 'number'
};

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
