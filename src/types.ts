'use strict';

export namespace Entities {
  
  export namespace Foo {
    
    export namespace GET {
    
      export  namespace Basic {

        export class Roop {

        }
      
        export class Req {

          headers: {
            zoomHeader: number
          };
          
          body: {
            zoomBody: string
          }
        }
      
        export  class Res {
          headers: {};
          body: {
            foo1: number,
            foo2: string,
            foo3: boolean
          }
        }
      
      }
    
    }
    
    export namespace PUT {
  
      export  namespace Basic {
        
        export class Req {
          headers: {};
          body: {
            bar: string
          }
        }
        
       export  class Res {
          headers: {};
          body: {
            foo: number
          }
        }
        
      }
      
    }
    
  }
  
}
