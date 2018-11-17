'use strict';

const {type, interfac, literal, struct, inline} = require('../dist/symbols');
const {defaultInt, defaultString, defaultBoolean} = require('../dist/defaults');

const set = (...args) => {
  const o = args.pop();
  for (let v of args) {
    o[v] = true;
  }
  return o;
};

exports.entities = {

  Inner: {
    Zoom: set(interfac,{

    })
  },

  foo: {

    PUT: {

      basic: set(interfac, {
        zoom: set(inline, [
          {dog: defaultString, pig: defaultBoolean}
        ]),
        faz: set(['Entities.Inner.Zoom', 'Froom', 'Star']),
        path: '/foo',
        req: set(struct, {
          headers: {
            'x-requested-by': 'foo'
          },
          body: set(type, {
            // foo: 'string',
            // bar:'number',
            // zoom: 'boolean'
            foo: defaultString,
            bar: defaultInt,
            zoom: defaultBoolean
          })
        }),
        res: set(struct, {
          headers: {}
        })
      }),

      tragic: {
        [interfac]: true,
        path: '/foo',
        req: {
          [struct]: true,
          headers: {
            'x-requested-by': 'foo'
          },
          body: {
            [type]: true,
            foo: 'string',
          }
        },
        res: {
          [struct]: true,
          headers: {}

        }
      }
    },

    GET: {

      miasmic: {
        [interfac]: true,
        path: '/foo',
        req: {
          [struct]: true,
          headers: {
            'x-requested-by': 'foo'
          },
          body: {
            [type]: true,
            foo: 'string',
          }
        },
        res: {
          [struct]: true,
          headers: {}
        }
      }
    }
  },


  bar: {

    PUT: {

      basic: {
        [interfac]: true,
        path: '/foo',
        req: {
          [struct]: true,
          headers: {},
          body: {}

        },
        res: {
          [struct]: true,
          headers: {}
        }
      }
    },

    GET: {
      basic: {
        [interfac]: true,
        path: '/foo',
        req: {
          [struct]: true,
          headers: {},
          body: {}
        },
        res: {
          [struct]: true,
          headers: {}
        }
      }

    }
  },

};
