package foo;

//https://www.oracle.com/technetwork/articles/java/json-1973242.html

public class Bar {

    public static void main(String[] args){

        Foo.Star.Car f = new Foo.Star.Car();
        System.out.println(f);

        URL url = new URL("https://graph.facebook.com/search?q=java&type=post");
        try (InputStream is = url.openStream();
       JsonReader rdr = Json.createReader(is)) {

                 JsonObject obj = rdr.readObject();
                 JsonArray results = obj.getJsonArray("data");
                 for (JsonObject result : results.getValuesAs(JsonObject.class)) {
                         System.out.print(result.getJsonObject("from").getString("name"));
                         System.out.print(": ");
                         System.out.println(result.getString("message", ""));
                         System.out.println("-----------");
                     }
             }

    }
}
