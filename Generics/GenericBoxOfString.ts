class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    toString(): string {
        return `${this.value}`;
    }
}

// Function to test the Box class with strings
function testBoxOfString() {
    // Read the number of strings from the console
    const n: number = Number(prompt("Enter the number of strings:"));

    // Validate if n is a positive number
    if (isNaN(n) || n <= 0) {
        console.error("Please enter a valid positive number for the count of strings.");
        return;
    }

    // Create an array to store Box<string> instances
    const boxes: Box<string>[] = [];

    // Read each string from the console and create a Box<string>
    for (let i = 0; i < n; i++) {
        const inputString: string = prompt(`Enter string ${i + 1}:`);
        const stringBox = new Box<string>(inputString);
        boxes.push(stringBox);
    }

    // Print the toString representation of each Box<string>
    for (const box of boxes) {
        console.log(box.toString());
    }
}

// Call the function to test the Box class with strings
testBoxOfString();
