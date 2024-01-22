// Define an interface for car functionality
interface Car {
    useBrakes(): string;
    pushGasPedal(): string;
}

// Define a class Ferrari that implements the Car interface
class Ferrari implements Car {
    // Model of the Ferrari
    private model: string;

    // Driver's name
    private driver: string;

    // Constructor that sets the model to "488-Spider" and initializes the driver
    constructor(driver: string) {
        this.model = "488-Spider";
        this.driver = driver;
    }

    // Implementation of the useBrakes method from the Car interface
    useBrakes(): string {
        return "Brakes!";
    }

    // Implementation of the pushGasPedal method from the Car interface
    pushGasPedal(): string {
        return "Zadu6avam sA!";
    }

    // Method to get information about the Ferrari
    getInfo(): string {
        return `${this.model}/${this.useBrakes()}/${this.pushGasPedal()}/${this.driver}`;
    }
}

// Example of creating a Ferrari and printing the info
const driverName = "John Doe";
const ferrari = new Ferrari(driverName);
console.log(ferrari.getInfo());
