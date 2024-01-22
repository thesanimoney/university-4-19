class Chicken {
    // Private fields to store name and age
    private _name: string;
    private _age: number;

    // Constructor with initial values for name and age
    constructor(name: string, age: number) {
        // Use setters to ensure correct state during object creation
        this.name = name;
        this.age = age;
    }

    // Getter for name with validation
    get name(): string {
        return this._name;
    }

    // Setter for name with validation
    set name(value: string) {
        // Validate the chicken's name
        if (!value || value.trim() === '') {
            // Throw an exception if the name is empty
            throw new Error('Name cannot be empty.');
        }
        // Set the name if it passes validation
        this._name = value;
    }

    // Getter for age with validation
    get age(): number {
        return this._age;
    }

    // Setter for age with validation
    set age(value: number) {
        // Validate the chicken's age
        if (value < 0 || value > 15) {
            // Throw an exception if the age is out of the specified range
            throw new Error('Age should be between 0 and 15.');
        }
        // Set the age if it passes validation
        this._age = value;
    }

    // Private method to calculate product per day
    private calculateProductPerDay(): number {
        // Internal logic to calculate product per day (e.g., based on age)
        return Math.min(1, Math.max(0, 0.75 * this._age));
    }

    // Public getter for product per day
    get productPerDay(): string {
        // Use the private method to calculate and return the product per day
        const eggsPerDay = this.calculateProductPerDay();
        return `Chicken ${this._name} (age ${this._age}) can produce ${eggsPerDay} eggs per day.`;
    }
}

// Example usage
try {
    // Creating an instance of the Chicken class with valid data
    const chicken = new Chicken('Mara', 10);

    // Displaying the product per day information
    console.log(chicken.productPerDay);
} catch (error) {
    // Handling and displaying validation errors
    console.error(error.message);
}
