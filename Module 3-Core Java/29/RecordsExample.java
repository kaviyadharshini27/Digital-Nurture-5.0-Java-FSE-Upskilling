import java.util.Arrays;
import java.util.List;

record Person(String name, int age) {
}

public class RecordsExample {
    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
                new Person("Kavi", 20),
                new Person("Ravi", 15),
                new Person("Anu", 22)
        );

        System.out.println("All persons:");
        for (Person p : people) {
            System.out.println(p);
        }

        System.out.println("Age above 18:");
        people.stream()
              .filter(p -> p.age() >= 18)
              .forEach(p -> System.out.println(p));
    }
}
