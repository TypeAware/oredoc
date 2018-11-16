'use strict';

const {type, interfac, literal, struct} = require('../dist/symbols');

exports.entities = {
  
  foo: {
    
    PUT: {
    
      basic: {
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
            bar:'number',
            zoom: 'boolean'
          }
        },
        res: {
          [struct]: true,
          headers: {}
          
        }
      },
  
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
