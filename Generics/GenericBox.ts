// Create a generic class Box
class Box<T> {
    private data: T;  // Store the value of type T

    // Constructor to initialize the Box with a value of type T
    constructor(value: T) {
        this.data = value;
    }

    // Override the toString method to provide a formatted string representation
    toString(): string {
        // Get the type name by explicitly passing it during construction
        const typeName = this.getTypeName(this.data);
        // Return the formatted string with the type name and the stored value
        return `${typeName}: ${this.data}`;
    }

    // Helper method to get the type name
    private getTypeName(value: any): string {
        // Check if the value has a constructor property
        if (value && value.constructor) {
            // Use the constructor's name if available
            return value.constructor.name;
        } else {
            // Fallback to typeof for primitive types
            return typeof value;
        }
    }
}

// Example usage
const stringBox = new Box("Hello, TypeScript!");
const numberBox = new Box(42);

// Print the formatted string representation
console.log(stringBox.toString()); // Output: String: Hello, TypeScript!
console.log(numberBox.toString()); // Output: Number: 42
