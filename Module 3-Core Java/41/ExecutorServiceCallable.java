import java.util.ArrayList;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ExecutorServiceCallable {
    public static void main(String[] args) {
        try {
            ExecutorService service = Executors.newFixedThreadPool(3);
            ArrayList<Future<Integer>> results = new ArrayList<>();

            for (int i = 1; i <= 5; i++) {
                int num = i;
                Callable<Integer> task = () -> num * num;
                results.add(service.submit(task));
            }

            for (Future<Integer> f : results) {
                System.out.println("Result: " + f.get());
            }

            service.shutdown();
        } catch (Exception e) {
            System.out.println("Executor error: " + e.getMessage());
        }
    }
}
