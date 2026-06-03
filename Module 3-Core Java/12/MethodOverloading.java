public class MethodOverloading {
    static int add(int a, int b) {
        return a + b;
    }

    static double add(double a, double b) {
        return a + b;
    }

    static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
        System.out.println("Two integer sum: " + add(10, 20));
        System.out.println("Two double sum: " + add(5.5, 4.5));
        System.out.println("Three integer sum: " + add(10, 20, 30));
    }
}
