package foo;

class Z {

}

public class Foo {

    public static class Star extends Z {
        String foo;
        public static class Car {

        }
    }

    public static class Zee extends Z {

        public static class Mars {

        }
    }

    public void zoom(){
        Object z = new Foo.Star(){};
    }

}


