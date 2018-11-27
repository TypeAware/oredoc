'use strict';

const {type, ts, literal, go} = require('../../../../../dist/symbols');
const {defaultInt, defaultString, defaultBoolean} = require('../../../../../dist/defaults');
const {set, setArray} = require('../../../../../dist/main');
const {setTypeMap} = require('../../../../../dist/utils');

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
  })

};


exports.entities = {

  foo: set(go.entity,{

    PUT: {

      basic: set(ts.interface, {
        
        req: set(go.file,{
          headers: {
            x_requested_by: custom.string
          },
          body: {
            foo: defaultString,
            bar: defaultInt,
            zoom: defaultBoolean
          }
        }),
        res: set(go.file,{
          headers: {
          }
        })
      }),

      tragic: set(ts.interface,{
        
        req: set(go.file,{
          headers: {
            x_requested_by: custom.string
          },
          body: {
            foo: custom.string
          }
        }),
        res: set(go.file,{
          headers: {

          }
        })
      })
    },

    GET: {
      miasmic: set(ts.interface,{
        
        req: set(go.file,{
          headers: {
            x_requested_by: custom.string
          },
          body: {
            foo: custom.string
          }
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
        req: set(go.file,{
          headers: {

          },
          body: {
            mip: defaultString,
            mop: defaultInt,
            map: defaultBoolean
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
            tip: defaultString,
            top: defaultInt,
            tap: defaultBoolean
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
