export namespace Entities {
 export namespace Inner {
   export interface Zoom {
   }
 }
 export namespace foo {
   export namespace PUT {
     export interface DogPigRoop {
       dog: string,
       pig: boolean,
       roop: Array<{}>
       stoop: Array<boolean>
     }
     export namespace basic {
       export interface req {
         boom: Array<Map<string,string><Array<boolean>>>,
         path: '/foo',
         zoom: DogPigRoop,
         headers: {
           x_requested_by: 'foo',
         }
         body: {
           foo: string,
           bar: number,
           zoom: boolean,
         }
       }
       export namespace res {
         export namespace headers {
         }
       }
     }
     export interface tragic {
       path: '/foo',
       req: {
         headers: {
           'x-requested-by': 'foo',
         }
         body: {
           fooLiteral: string,
         }
       }
       res: {
         headers: {
         }
       }
     }
   }
   export namespace GET {
     export interface miasmic {
       path: '/foo',
       req: {
         headers: {
           x_requested_by: 'foo',
         }
         body: {
           foo: 'string',
         }
       }
       res: {
         headers: {
         }
       }
     }
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
 }
}
