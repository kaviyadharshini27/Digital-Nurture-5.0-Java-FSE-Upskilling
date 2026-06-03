import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class StudentDAO {
    static Connection getConnection() throws Exception {
        String url = "jdbc:mysql://localhost:3306/college";
        String user = "root";
        String password = "";
        return DriverManager.getConnection(url, user, password);
    }

    static void insertStudent(int id, String name) {
        try {
            Connection con = getConnection();
            PreparedStatement ps = con.prepareStatement("insert into students values (?, ?)");
            ps.setInt(1, id);
            ps.setString(2, name);
            ps.executeUpdate();
            con.close();
            System.out.println("Student inserted");
        } catch (Exception e) {
            System.out.println("Insert error: " + e.getMessage());
        }
    }

    static void updateStudent(int id, String name) {
        try {
            Connection con = getConnection();
            PreparedStatement ps = con.prepareStatement("update students set name=? where id=?");
            ps.setString(1, name);
            ps.setInt(2, id);
            ps.executeUpdate();
            con.close();
            System.out.println("Student updated");
        } catch (Exception e) {
            System.out.println("Update error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        insertStudent(1, "Kavi");
        updateStudent(1, "Kavya");
    }
}
