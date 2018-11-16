package foo;

class Z {

}

public class Foo {

    public static class FooChild extends Z {
        String foo;
    }

    public static class ZeeChild extends Z {

    }

    public void zoom(){
        Object z = new Foo.ZeeChild(){};
    }

}


