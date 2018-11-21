package suman;

import java.net.*;
import java.io.*;
import org.json.*;

//https://www.oracle.com/technetwork/articles/java/json-1973242.html

class JsonObject {
    String foo;
}

public class App {
    public static void main(String[] args) {

        URL url = new URL("https://raw.githubusercontent.com/oresoftware/oredoc/master/test/builds/java/one/test.json");
        try (InputStream is = url.openStream(); JsonReader rdr = Json.createReader(is)) {
            JsonObject obj = rdr.readObject();
            JsonArray results = obj.getJsonArray("data");
            for (JsonObject result : results.getValuesAs(JsonObject.class)) {
                System.out.print(result.getJsonObject("from").getString("name"));
                System.out.println(result.getString("message", ""));
            }
        }

    }
}
