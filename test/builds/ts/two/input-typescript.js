'use strict';


const {ts, literal, go, optional, chld} = require('../../../../dist/symbols');
const {defaultInt, defaultString, defaultBoolean, defaultArray} = require('../../../../dist/defaults');
const {set, setType, simpleType} = require('../../../../dist/main');
const {setTypeMap} = require('../../../../dist/utils');

exports.lang = {

  'java':{
    package: '',
    imports: [

    ],
    output: {
      filename: '',
      folder: ''
    }

  }
};

const customMap = setTypeMap({
  'typescript': 'Map<?,?>' //'Map<%s,%s>'
});


const customArray = setTypeMap({
  'typescript': 'Array<?>' //'Map<%s,%s>'
});


exports.entities = {

  Inner: {
    Zoom: set(ts.interface,{

    })
  },

  foo: {

    PUT: {

      DogPigRoop:  set(ts.interface, {
        dog: defaultString,
        pig: defaultBoolean,
        roop:[{}],
        stoop: [defaultBoolean]
      }),

      basic: set({

        // boom: setArray(inline, [defaultString]),
        // toom: setArray(inline, [
        //   []
        // ]),
        // faz: setArray(literal,[
        //   'Entities.Inner.Zoom', 'Froom', 'Star'
        // ]),

        req: set(go.struct, ts.interface, {

          boom: setType({
            compound: [defaultArray, customMap, [ defaultBoolean, customArray,[defaultInt]]]
            // compound: [defaultArray, customMap, [defaultArray, defaultBoolean]]
          }),

          path: '/foo',

          room: setType({
            compound: [defaultArray, 'DogPigRoop'],
            // link: 'DogPigRoop'
          }),

          zoom: setType({
            link: 'DogPigRoop'
          }),

          headers: {
            'x_requested_by': 'foo'
          },
          body: set({
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
          body: set(chld.literal,{
            fooLiteral: 'string'
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
            'x_requested_by': 'foo'
          },
          body: set({
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
