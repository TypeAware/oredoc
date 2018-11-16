export namespace Entities {
 export namespace foo {
   export namespace PUT {
     export interface basic {
       path: '/foo',
       req: {
         headers: {
           'x-requested-by': 'foo',
         }
         body: {
         }
       }
       res: {
         headers: {
         }
       }
     }
   }
   export namespace GET {
   }
 }
 export namespace bar {
   export namespace PUT {
     export interface basic {
       path: '/foo',
       req: {
         headers: {
         }
         body: {
         }
       }
       res: {
         headers: {
         }
       }
     }
   }
   export namespace GET {
     export interface basic {
       path: '/foo',
       req: {
         headers: {
         }
         body: {
         }
       }
       res: {
         headers: {
         }
       }
     }
   }
 }}
