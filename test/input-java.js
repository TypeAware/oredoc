'use strict';

const {type, interfac, literal, struct} = require('../dist/symbols');
const {defaultInt, defaultString, defaultBoolean} = require('../dist/defaults');


const set = (...args) => {
  const o = args.pop();
  for(let v of args){
    o[v] = true;
  }
  return o;
};

const custom = {

  int: {
    golang:'int8',
    java: 'int',
    typescript:'number'
  },
  string: {
    golang:'string',
    java: 'String',
    typescript:'string'
  },
  bool: {
    golang:'bool',
    java: 'boolean',
    typescript:'boolean'
  }

};



exports.entities = {

  foo: {

    PUT: {

      basic: set(interfac,{
        path: '/foo',
        req: set(struct, {
          headers: {
            'x-requested-by':'foo'
          },
          body: set(type,{
            foo: [custom.string, `'bar'`],
            bar: [custom.int, 5],
            zoom: [custom.bool, false]
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
            'x-requested-by':'foo'
          },
          body: {
            [type]: true,
            foo:'string',
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
            'x-requested-by':'foo'
          },
          body: {
            [type]: true,
            foo:'string',
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
