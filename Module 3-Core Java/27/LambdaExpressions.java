import java.util.ArrayList;
import java.util.Collections;

public class LambdaExpressions {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Ravi");
        names.add("Anu");
        names.add("Kavi");
        names.add("Bala");

        Collections.sort(names, (a, b) -> a.compareTo(b));

        System.out.println("Sorted names:");
        for (String name : names) {
            System.out.println(name);
        }
    }
}
