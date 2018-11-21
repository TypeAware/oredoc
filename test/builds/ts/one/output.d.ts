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
     export interface basic {
       zoom: DogPigRoop,
       path: /foo,
       req: {
         headers: {
           x-requested-by: foo,
         }
         body: {
           foo: string,
           bar: number,
           zoom: boolean,
         }
       }
       res: {
         headers: {
         }
       }
     }
     export interface tragic {
       path: /foo,
       req: {
         headers: {
           x-requested-by: foo,
         }
         body: {
           foo: string,
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
       path: /foo,
       req: {
         headers: {
           x-requested-by: foo,
         }
         body: {
           foo: string,
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
       path: /foo,
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
       path: /foo,
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
