'use strict';

const foo = {
  bar: {
    star: {
      guitar: 'geetar'
    }
  }
};

const stew = {
  moo: () => foo.bar.star.guitar
};

let guitar;
try {
  guitar = stew.moo();
  console.log(guitar);
}
catch (err) {
  console.error('Could not get value from:', stew.moo.toString());
}
