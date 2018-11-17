const s = Symbol('foo');

const v = [1,2,3];

v[s] = true;

console.log(v);

v.forEach(v => console.log(v));
