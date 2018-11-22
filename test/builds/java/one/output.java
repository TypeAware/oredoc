public class Entities {
 public static class foo {
   public static class PUT {
     public static class basic {
       String path;
       public static class req {
         Map<String,String> headers;
         public static class body {
           String foo;
           int bar;
           boolean zoom;
         }
       }
       public static class res {
         Map<String,String> headers;
       }
     }
     public static class tragic {
       String path;
       public static class req {
         Map<String,String> headers;
         public static class body {
           tragic.req vv;
           req ggg;
           tragic.req zzz;
           String foo;
         }
       }
       public static class res {
         Map<String,String> headers;
       }
     }
   }
   public static class GET {
     public static class miasmic {
       String path;
       public static class req {
         Map<String,String> headers;
         public static class body {
           String foo;
         }
       }
       public static class res {
         Map<String,String> headers;
       }
     }
   }
 }
 public static class bar {
   public static class PUT {
     public static class basic {
       String path;
       public static class req {
         Map<String,String> headers;
         public static class body {
         }
       }
       public static class res {
         Map<String,String> headers;
       }
     }
   }
   public static class GET {
     public static class basic {
       String path;
       public static class req {
         Map<String,String> headers;
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
