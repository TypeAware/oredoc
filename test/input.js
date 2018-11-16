'use strict';

const {type, interfac, literal} = require('../dist/symbols');

exports.entities = {
  
  foo: {
    
    PUT: {
      
      basic: {
        
        [interfac]: true,
        path: '/foo',
        
        req: {
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
          headers: {}
          
        }
      }
    },
    
    GET: {
    
    
    
    }
  },
  
  
  bar: {
    
    PUT: {
      
      basic: {
        
        [interfac]: true,
        path: '/foo',
        
        req: {
          
          headers: {},
          body: {}
          
        },
        res: {
          headers: {}
          
        }
      }
    },
    
    GET: {
  
      basic: {
        
        [interfac]: true,
    
        path: '/foo',
    
        req: {
      
          headers: {},
          body: {}
      
        },
        res: {
          headers: {}
      
        }
      }
      
    }
  },
  
  
  
};
