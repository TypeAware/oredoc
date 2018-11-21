package suman;

import java.lang.*;
import java.net.*;
import java.io.*;
import com.google.gson.*;
import static java.lang.System.out;
import static suman.Entities.foo;
import java.util.ArrayList;

class JsonObject extends foo.PUT.basic.req.body {
    String stew;
    Nested nested;
    ArrayList<String> list = new ArrayList<String>();
    public JsonObject(Nested n, String s, foo.PUT.basic.res.Headers h){
        this.nested = n;
        this.stew = s;
        this.h = h;
    }
}

class Nested {
    String bar = "this is nested";
}

public class App {
    public static void main(String[] args) {

        Gson gson = new Gson();
        Nested n = new Nested();
        JsonObject obj = new JsonObject(n, "dog");
        String json = gson.toJson(obj);
        out.println(json);

        JsonObject o = gson.fromJson(json, JsonObject.class);
        out.println(o);
        out.println(gson.toJson(o));


    }
}
