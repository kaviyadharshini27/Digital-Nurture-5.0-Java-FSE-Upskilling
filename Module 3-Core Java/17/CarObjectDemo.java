class Car {
    String make;
    String model;
    int year;

    void displayDetails() {
        System.out.println("Make: " + make);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
    }
}

public class CarObjectDemo {
    public static void main(String[] args) {
        Car car = new Car();
        car.make = "Toyota";
        car.model = "Innova";
        car.year = 2024;

        car.displayDetails();
    }
}
