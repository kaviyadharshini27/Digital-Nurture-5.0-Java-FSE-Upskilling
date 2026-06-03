public class PatternMatchingSwitch {
    static void checkType(Object obj) {
        switch (obj) {
            case Integer i -> System.out.println("Integer value: " + i);
            case String s -> System.out.println("String value: " + s);
            case Double d -> System.out.println("Double value: " + d);
            case null -> System.out.println("Null value");
            default -> System.out.println("Other type");
        }
    }

    public static void main(String[] args) {
        checkType(10);
        checkType("Java");
        checkType(25.5);
        checkType(true);
    }
}
