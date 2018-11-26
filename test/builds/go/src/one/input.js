'use strict';

const {type, ts, literal, go} = require('../../../../../dist/symbols');
const {defaultInt, defaultString, defaultBoolean} = require('../../../../../dist/defaults');
const {set, setArray} = require('../../../../../dist/main');

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
        req: set(go.file,{
          headers: {
            'x-requested-by': 'foo'
          },
          body: set(type, {
            foo: defaultString,
            bar: defaultInt,
            zoom: defaultBoolean
          })
        }),
        res: set(go.file,{
          headers: {
          }
        })
      }),

      tragic: set(ts.interface,{
        path: '/foo',
        req: set(go.file,{
          headers: {
            'x-requested-by': 'foo'
          },
          body: set(type,{
            foo: 'string'
          })
        }),
        res: set(go.file,{
          headers: {

          }
        })
      })
    },

    GET: {
      miasmic: set(ts.interface,{
        path: '/foo',
        req: set(go.file,{
          headers: {
            'x-requested-by': 'foo'
          },
          body: set(type,{
            foo: 'string',
          })
        }),
        res: set(go.file,{
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
        req: set(go.file,{
          headers: {

          },
          body: {

          }
        }),
        res: set(go.file,{
          headers: {
          }
        })
      })
    },

    GET: {
      basic: set(ts.interface,{
        req: set(go.file,{
          headers: {

          },
          body: {
          }
        }),
        res: set(go.file,{
          headers: {
          }
        })
      })
    }
  }),

};
