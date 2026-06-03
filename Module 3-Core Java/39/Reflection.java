import java.lang.reflect.Method;

class SampleClass {
    public void greet() {
        System.out.println("Hello from reflection");
    }

    private void secretMethod() {
        System.out.println("Secret method called");
    }
}

public class Reflection {
    public static void main(String[] args) {
        try {
            Class<?> c = Class.forName("SampleClass");

            Method[] methods = c.getDeclaredMethods();
            for (Method m : methods) {
                System.out.println(m.getName());
            }

            Object obj = c.getDeclaredConstructor().newInstance();

            Method greet = c.getMethod("greet");
            greet.invoke(obj);

            Method secret = c.getDeclaredMethod("secretMethod");
            secret.setAccessible(true);
            secret.invoke(obj);
        } catch (Exception e) {
            System.out.println("Reflection error: " + e.getMessage());
        }
    }
}
