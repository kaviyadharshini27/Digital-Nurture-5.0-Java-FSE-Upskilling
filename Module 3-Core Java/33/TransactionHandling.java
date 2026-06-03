import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class TransactionHandling {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/bank";
        String user = "root";
        String password = "";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            con.setAutoCommit(false);

            PreparedStatement debit = con.prepareStatement("update accounts set balance = balance - ? where id = ?");
            debit.setInt(1, 500);
            debit.setInt(2, 1);
            int a = debit.executeUpdate();

            PreparedStatement credit = con.prepareStatement("update accounts set balance = balance + ? where id = ?");
            credit.setInt(1, 500);
            credit.setInt(2, 2);
            int b = credit.executeUpdate();

            if (a == 1 && b == 1) {
                con.commit();
                System.out.println("Money transferred");
            } else {
                con.rollback();
                System.out.println("Transaction failed");
            }

            con.close();
        } catch (Exception e) {
            System.out.println("Transaction error: " + e.getMessage());
        }
    }
}
