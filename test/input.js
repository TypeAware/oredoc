'use strict';

exports.entities = {
  
  foo: {
    
    PUT: {
      
      basic: {
        
        '@interface': true,
        
        path: '/foo',
        
        req: {
          
          headers: {
            'x-requested-by':'foo'
          },
          body: {
          
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
  
        '@interface': true,
        
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
  
        '@interface': true,
    
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
