class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    toString(): string {
        return `${this.value}`;
    }
}

// Function to test the Box class with integers
function testBoxOfInteger() {
    // Read the number of integers from the console
    const n: number = Number(prompt("Enter the number of integers:"));

    // Validate if n is a positive number
    if (isNaN(n) || n <= 0) {
        console.error("Please enter a valid positive number for the count of integers.");
        return;
    }

    // Create an array to store Box<number> instances
    const boxes: Box<number>[] = [];

    // Read each integer from the console and create a Box<number>
    for (let i = 0; i < n; i++) {
        const inputInteger: number = Number(prompt(`Enter integer ${i + 1}:`));

        // Validate if input is a valid number
        if (isNaN(inputInteger)) {
            console.error(`Invalid input for integer ${i + 1}. Please enter a valid number.`);
            return;
        }

        const integerBox = new Box<number>(inputInteger);
        boxes.push(integerBox);
    }

    // Print the toString representation of each Box<number>
    for (const box of boxes) {
        console.log(box.toString());
    }
}

// Call the function to test the Box class with integers
testBoxOfInteger();
