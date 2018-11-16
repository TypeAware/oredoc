export namespace Entities {
 export namespace foo {
   export namespace PUT {
     export namespace basic {
       path: '/foo',
       export namespace req {
         export namespace headers {
           'x-requested-by': 'foo',
         }
         export namespace body {
           foo: 'string',
           bar: 'number',
           zoom: 'boolean',
         }
       }
       export namespace res {
         export namespace headers {
         }
       }
     }
   }
   export namespace GET {
   }
 }
 export namespace bar {
   export namespace PUT {
     export namespace basic {
       path: '/foo',
       export namespace req {
         export namespace headers {
         }
         export namespace body {
         }
       }
       export namespace res {
         export namespace headers {
         }
       }
     }
   }
   export namespace GET {
     export namespace basic {
       path: '/foo',
       export namespace req {
         export namespace headers {
         }
         export namespace body {
         }
       }
       export namespace res {
         export namespace headers {
         }
       }
     }
   }
 }}
