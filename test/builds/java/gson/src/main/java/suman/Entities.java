package suman;

public class Entities {
  static class foo {
    static class PUT {
      static interface basic {
       String path = "/foo";
        static class req {
          static class headers {
           String x_requested_by = "foo";
         }
          static class body {
           String foo = "bar";
           int bar = 5;
           boolean zoom = false;
           req h;
//           Entities.foo.PUT.basic.res.Headers h;
         }
       }
        static class res {
          static class Headers {
         }
       }
     }
      static interface tragic {
       String path = "/foo";
        static class req {
         static class headers {
           String x_requested_by = "foo";
         }
         static class body {
           String foo;
         }
       }
       static class res {
         static class headers {
         }
       }
     }
   }
   static class GET {
     static interface miasmic {
       String path = "/foo";
       static class req {
         static class headers {
           String x_requested_by = "foo";
         }
         static class body {
           String foo;
         }
       }
       static class res {
         static class headers {
         }
       }
     }
   }
 }
 static class bar {
   static class PUT {
     static interface basic {
       String path = "/foo";
       static class req {
         static class headers {
         }
         static class body {
         }
       }
       static class res {
         static class headers {
         }
       }
     }
   }
   static class GET {
     static interface basic {
       String path = "/foo";
       static class req {
         static class headers {
         }
         static class body {
         }
       }
       static class res {
         static class headers {
         }
       }
     }
   }
 }
}
