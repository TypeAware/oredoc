'use strict';

const {type, ts, literal, go, inline} = require('../../../../dist/symbols');
const {defaultInt, defaultString, defaultBoolean} = require('../../../../dist/defaults');
const {set, setArray} = require('../../../../dist/main');



exports.entities = {

  Inner: {
    Zoom: set(ts.interface,{

    })
  },

  foo: {

    PUT: {
      basic: set(ts.interface, {
        zoom: set(inline, [
          {dog: defaultString, pig: defaultBoolean, roop:[{}]}
        ]),
        boom: set(inline, [
         defaultString
        ]),
        toom: set(inline, [
          []
        ]),
        faz: set(['Entities.Inner.Zoom', 'Froom', 'Star']),
        path: '/foo',
        req: set(go.struct, {
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
        res: set(go.struct, {
          headers: {}
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
        res: set(go.struct, {
          headers: {}
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
          headers: {}
        })
      })
    }
  },


  bar: {
    PUT: {
      basic: set(ts.interface,{
        [optional]:['path'],
        path: '/foo',
        req: set(go.struct,{
          headers: {},
          body: {}
        }),
        res: set(go.struct,{
          headers: {}
        })
      })
    },

    GET: {
      basic: set(ts.interface,{
        path: '/foo',
        req: set(go.struct,{
          headers: {},
          body: {}
        }),
        res: set(go.struct,{
          headers: {}
        })
      })

    }
  },

};
