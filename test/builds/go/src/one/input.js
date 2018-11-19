'use strict';

const {type, ts, literal, go} = require('../../../../../dist/symbols');
const {defaultInt, defaultString, defaultBoolean} = require('../../../../../dist/defaults');


const custom = {

  int: {
    golang: 'int8',
    java: 'int',
    typescript: 'number'
  },
  string: {
    golang: 'string',
    java: 'String',
    typescript: 'string'
  },
  bool: {
    golang: 'bool',
    java: 'boolean',
    typescript: 'boolean'
  }

};


exports.entities = {

  foo: set(go.entity,{

    PUT: {

      basic: set(ts.interface, {
        path: '/foo',
        req: set(go.struct,{
          headers: {
            'x-requested-by': 'foo'
          },
          body: set(type, {
            foo: [custom.string, `'bar'`],
            bar: [custom.int, 5],
            zoom: [custom.bool, false]
          })
        }),
        res: set(go.struct,{
          headers: {
          }
        })
      }),

      tragic: set(ts.interface,{
        path: '/foo',
        req: set(go.struct,{
          headers: {
            'x-requested-by': 'foo'
          },
          body: set(type,{
            foo: 'string'
          })
        }),
        res: set(go.struct,{
          headers: {

          }
        })
      })
    },

    GET: {
      miasmic: set(ts.interface,{
        path: '/foo',
        req: set(go.struct,{
          headers: {
            'x-requested-by': 'foo'
          },
          body: set(type,{
            foo: 'string',
          })
        }),
        res: set(go.struct,{
          headers: {
          }
        })
      })
    }
  }),

  bar: set(go.entity,{
    PUT: {
      basic: set(ts.interface,{
        path: '/foo',
        req: set(go.struct,{
          headers: {

          },
          body: {

          }
        }),
        res: set(go.struct,{
          headers: {
          }
        })
      })
    },

    GET: {
      basic: set(ts.interface,{
        path: '/foo',
        req: set(go.struct,{
          headers: {

          },
          body: {
          }
        }),
        res: set(go.struct,{
          headers: {
          }
        })
      })
    }
  }),

};
