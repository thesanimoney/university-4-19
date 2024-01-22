// Modified generic Box class with support for comparing elements
class Box<T extends Comparable> {
    private value: T;

    // Constructor to initialize a Box with a value
    constructor(value: T) {
        this.value = value;
    }

    // Getter method to retrieve the value stored in the Box
    getValue(): T {
        return this.value;
    }

    // Implement the compareTo method to compare elements
    compareTo(other: T): number {
        // Custom comparison logic based on the element type
        if (this.value > other) {
            return 1;
        } else if (this.value < other) {
            return -1;
        } else {
            return 0;
        }
    }
}

// Define a Comparable interface to ensure elements can be compared
// Define a Comparable interface to ensure elements can be compared
interface Comparable {
    // Method to compare the current instance with another value and return a numerical result
    // -1 if the current instance is less than the other value
    //  0 if the current instance is equal to the other value
    //  1 if the current instance is greater than the other value
    compareTo(other: any): number;
}

// Generic method to count elements greater than a given value
function countGreaterThan<T extends Comparable>(list: Box<T>[], value: T): number {
    let count = 0;

    // Iterate through each element in the list and compare with the given value
    for (const box of list) {
        // Use the compareTo method from the Comparable interface to compare values
        if (box.getValue().compareTo(value) > 0) {
            // If the result is greater than 0, the current element is greater than the given value
            count++;
        }
    }
    return count;
}


// Function to test the countGreaterThan method with doubles
function testCountGreaterThanWithDouble() {
    // Read the number of elements from the console
    const n: number = Number(prompt("Enter the number of elements:"));

    // Validate if n is a positive number
    if (isNaN(n) || n <= 0) {
        console.error("Please enter a valid positive number for the count of elements.");
        return;
    }

    // Create an array to store Box<number> instances
    const boxes: Box<number>[] = [];

    // Read each double from the console and create a Box<number>
    for (let i = 0; i < n; i++) {
        const inputDouble: number = Number(prompt(`Enter element ${i + 1}:`));

        // Validate if input is a valid number
        if (isNaN(inputDouble)) {
            console.error(`Invalid input for element ${i + 1}. Please enter a valid number.`);
            return;
        }

        const doubleBox = new Box<number>(inputDouble);
        boxes.push(doubleBox);
    }

    // Read the value for comparison from the console
    const comparisonValue: number = Number(prompt("Enter the value for comparison:"));

    // Count the elements greater than the given value
    const result = countGreaterThan(boxes, new Box<number>(comparisonValue));

    // Print the result
    console.log(`Count of elements greater than ${comparisonValue}: ${result}`);
}

// Call the function to test the countGreaterThan method with doubles
testCountGreaterThanWithDouble();
