package suman;

import java.lang.*;
import java.net.*;
import java.io.*;
import com.google.gson.*;
import static java.lang.System.out;
import static suman.Entities.foo;
import java.util.*;

class JsonObject extends foo.PUT.basic.req.body {
    String stew;
    Nested nested;
    Map m;
    ArrayList<String> list = new ArrayList<String>();
    public JsonObject(Nested n, String s, foo.PUT.basic.res.Headers h){
        this.nested = n;
        this.stew = s;
        this.h = h;
        this.m = new HashMap<String, String>();
        this.m.put("Zara", new Nested());
        this.m.put("Mahnaz", "31");
        this.m.put("Ayan", "12");
    }
}

class Nested {
    String bar = "this is nested";
}

public class App {
    public static void main(String[] args) {

        Gson gson = new Gson();
        Nested n = new Nested();
        foo.PUT.basic.res.Headers h = new foo.PUT.basic.res.Headers();
        JsonObject obj = new JsonObject(n, "dog", h);
        String json = gson.toJson(obj);
        out.println(json);

        JsonObject o = gson.fromJson(json, JsonObject.class);
        out.println(o);
        out.println(gson.toJson(o));


    }
}
