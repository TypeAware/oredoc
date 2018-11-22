
var Module = require('module');

function requireFromString(src, filename) {
  var m = new Module(filename, null);
  m._compile(src, filename);
  m.loaded = true;
  m.filename = filename;
  return m;
}

console.log(
  requireFromString(
    'module.exports = { test: 1}',
    'uuid'
  )
);

const x = require('uuid');
console.log(x);

console.log(
  'cache:',
  require.cache
);
