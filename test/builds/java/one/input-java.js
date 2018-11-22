'use strict';

const {setTypeMap} = require( "../../../../dist/utils");
const {java,ts, literal, go} = require('../../../../dist/symbols');
const {defaultInt, defaultString, defaultBoolean} = require('../../../../dist/defaults');
const {set, setArray, setType} = require('../../../../dist/main');

const custom = {

  int: setTypeMap({
    golang: 'int8',
    java: 'int',
    typescript: 'number'
  }),

  string: setTypeMap({
    golang: 'string',
    java: 'String',
    typescript: 'string'
  }),

  bool: setTypeMap({
    golang: 'bool',
    java: 'boolean',
    typescript: 'boolean'
  }),

  map: setTypeMap({
    golang: 'map[string]string',
    java: 'Map<String,String>',
    typescript: 'Map<string,string>'
  })
};


exports.entities = {

  foo: {

    PUT: {
      basic: set(ts.interface, {
        path: custom.string,
        req: set(go.struct, {
          headers: custom.map,
          body: {
            foo: custom.string,
            bar: custom.int,
            zoom: custom.bool
          },
          // biz: set({
          //   foo: [custom.string, `'bar'`],
          //   bar: [custom.int, 5],
          //   zoom: [custom.bool, false]
          // })
        }),
        res: set(go.struct, {
          headers: custom.map
        })
      }),

      tragic: set(ts.interface, {
        path: custom.string,
        req: set(go.struct, {
          headers: custom.map,
          body: set({
            vv: setType({
              compound: ['tragic.req']
            }),
            ggg: setType({
              linkfn: () => exports.entities.foo.PUT.tragic.req
            }),
            zzz: setType({
              link: 'tragic.req'
            }),
            foo: custom.string,
          })
        }),
        res: set(go.struct, {
          headers: custom.map
        })
      })
    },

    GET: {
      miasmic: set(ts.interface, {
        path: custom.string,
        req: set(go.struct, {
          headers: custom.map,
          body: set({
            foo: custom.string,
          })
        }),
        res: set(go.struct, {
          headers: custom.map
        })
      })
    }
  },


  bar: {
    PUT: {
      basic: set(ts.interface, {
        path: custom.string,
        req: set(go.struct, {
          headers: custom.map,
          body: {}
        }),
        res: set(go.struct, {
          headers: custom.map
        })
      })
    },

    GET: {
      basic: set(ts.interface, {
        path: custom.string,
        req: set(go.struct, {
          headers: custom.map,
          body: {}
        }),
        res: set(go.struct, {
          headers: {}
        })
      })
    }
  },

};

