// Modified generic Box class with support for comparing elements
class Box<T extends Comparable> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }

    // Implement the compareTo method to compare elements
    compareTo(other: T): number {
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
interface Comparable {
    compareTo(other: any): number;
}

// Generic method to count elements greater than a given value
function countGreaterThan<T extends Comparable>(list: Box<T>[], value: T): number {
    let count = 0;

    // Iterate through each element in the list and compare with the given value
    for (const box of list) {
        if (box.getValue().compareTo(value) > 0) {
            count++;
        }
    }

    return count;
}

// Function to test the countGreaterThan method with strings
function testCountGreaterThanWithString() {
    // Read the number of elements from the console
    const n: number = Number(prompt("Enter the number of elements:"));

    // Validate if n is a positive number
    if (isNaN(n) || n <= 0) {
        console.error("Please enter a valid positive number for the count of elements.");
        return;
    }

    // Create an array to store Box<string> instances
    const boxes: Box<string>[] = [];

    // Read each string from the console and create a Box<string>
    for (let i = 0; i < n; i++) {
        const inputString: string = prompt(`Enter element ${i + 1}:`);
        const stringBox = new Box<string>(inputString);
        boxes.push(stringBox);
    }

    // Read the value for comparison from the console
    const comparisonValue: string = prompt("Enter the value for comparison:");

    // Count the elements greater than the given value
    const result = countGreaterThan(boxes, new Box<string>(comparisonValue));

    // Print the result
    console.log(`Count of elements greater than ${comparisonValue}: ${result}`);
}

// Call the function to test the countGreaterThan method with strings
testCountGreaterThanWithString();
