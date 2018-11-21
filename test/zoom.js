
const s = Symbol('foo');

const v = {};

v[s] = true;

console.log({v});

const x = Object.assign({}, v);

console.log({x});
