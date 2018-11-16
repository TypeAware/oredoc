import {RouteBaseMulti} from './main';

export namespace Entities {
  
  export namespace Foo {
    
    export namespace GET {
    
      export  namespace Basic {
      
        export interface Req {
          headers: {
            zoomHeader: 5
          },
          body: {
            zoomBody: '44'
          }
        }
      
        export  interface Res {
          headers: {},
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
        
        export interface Req {
          headers: {},
          body: {
            bar: string
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
