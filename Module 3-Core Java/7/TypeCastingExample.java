public class TypeCastingExample {
    public static void main(String[] args) {
        double value = 45.89;
        int number = (int) value;

        int marks = 95;
        double newMarks = marks;

        System.out.println("Double value: " + value);
        System.out.println("After converting double to int: " + number);
        System.out.println("Integer value: " + marks);
        System.out.println("After converting int to double: " + newMarks);
    }
}
