import java.util.Random;
import java.util.Scanner;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random r = new Random();

        int secret = r.nextInt(100) + 1;
        int guess = 0;

        while (guess != secret) {
            System.out.print("Guess a number between 1 and 100: ");
            guess = sc.nextInt();

            if (guess > secret) {
                System.out.println("Too high");
            } else if (guess < secret) {
                System.out.println("Too low");
            } else {
                System.out.println("Correct guess");
            }
        }

        sc.close();
    }
}
