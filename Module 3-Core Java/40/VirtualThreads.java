public class VirtualThreads {
    public static void main(String[] args) throws InterruptedException {
        int count = 1000;
        Thread[] threads = new Thread[count];

        for (int i = 0; i < count; i++) {
            int id = i;
            threads[i] = Thread.startVirtualThread(() -> {
                System.out.println("Virtual thread " + id);
            });
        }

        for (Thread t : threads) {
            t.join();
        }

        System.out.println("All virtual threads completed");
    }
}
