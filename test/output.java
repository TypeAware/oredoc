public class Entities {
 public static class foo {
   public static class PUT {
     public static interface basic {
       String path = '/foo';
       public static class req {
         public static class headers {
           String 'x-requested-by' = 'foo';
         }
         public static class body {
           String foo = 'bar';
           int bar = 5;
           boolean zoom = false;
         }
       }
       public static class res {
         public static class headers {
         }
       }
     }
     public static interface tragic {
       String path = '/foo';
       public static class req {
         public static class headers {
           String 'x-requested-by' = 'foo';
         }
         public static class body {
           string foo;
         }
       }
       public static class res {
         public static class headers {
         }
       }
     }
   }
   public static class GET {
     public static interface miasmic {
       String path = '/foo';
       public static class req {
         public static class headers {
           String 'x-requested-by' = 'foo';
         }
         public static class body {
           string foo;
         }
       }
       public static class res {
         public static class headers {
         }
       }
     }
   }
 }
 public static class bar {
   public static class PUT {
     public static interface basic {
       String path = '/foo';
       public static class req {
         public static class headers {
         }
         public static class body {
         }
       }
       public static class res {
         public static class headers {
         }
       }
     }
   }
   public static class GET {
     public static interface basic {
       String path = '/foo';
       public static class req {
         public static class headers {
         }
         public static class body {
         }
       }
       public static class res {
         public static class headers {
         }
       }
     }
   }
 }
}
