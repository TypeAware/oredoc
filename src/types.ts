import {RouteBaseMulti} from './main';

export namespace Entities {
  
  export namespace Foo {
  
    export namespace PUT {
  
      export  namespace Basic {
        
        export interface Req {
          headers: {},
          body: {
            foo: string
          }
        }
        
       export  interface Res {
          headers: {},
          body: {
            foo: number
          }
        }
        
      }
      
    }
    
  }
  
}
