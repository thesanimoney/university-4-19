// Define a generic class to represent a list that supports element swapping
class SwapList<T> {
    private list: T[];  // Internal array to store elements

    // Constructor to initialize an empty list
    constructor() {
        this.list = [];
    }

    // Method to add an element to the list
    add(element: T): void {
        this.list.push(element);
    }

    // Method to swap elements at two given indices in the list
    swap(index1: number, index2: number): void {
        // Check if indices are valid
        if (index1 < 0 || index1 >= this.list.length || index2 < 0 || index2 >= this.list.length) {
            console.error("Invalid indices for swap.");
            return;
        }

        // Swap elements at the given indices
        const temp = this.list[index1];
        this.list[index1] = this.list[index2];
        this.list[index2] = temp;
    }

    // Method to print each element in the list
    printList(): void {
        // Print each element in the list
        for (const element of this.list) {
            console.log(element);
        }
    }
}

// Function to test the SwapList class with integers
function testSwapListWithInteger() {
    // Read the number of integers from the console
    const n: number = Number(prompt("Enter the number of integers:"));

    // Validate if n is a positive number
    if (isNaN(n) || n <= 0) {
        console.error("Please enter a valid positive number for the count of integers.");
        return;
    }

    // Create a SwapList<number> instance
    const swapList = new SwapList<number>();

    // Read each integer from the console and add it to the list
    for (let i = 0; i < n; i++) {
        const inputInteger: number = Number(prompt(`Enter integer ${i + 1}:`));

        // Validate if input is a valid number
        if (isNaN(inputInteger)) {
            console.error(`Invalid input for integer ${i + 1}. Please enter a valid number.`);
            return;
        }

        swapList.add(inputInteger);
    }

    // Read the swap command
    const swapCommand = prompt("Enter swap command (two space-separated indices):");
    const [index1, index2] = swapCommand.split(" ").map(Number);

    // Validate if the swap command is valid
    if (isNaN(index1) || isNaN(index2)) {
        console.error("Invalid swap command. Please enter two space-separated indices.");
        return;
    }

    // Perform the swap using the generic swap method
    swapList.swap(index1, index2);

    // Print the elements in the list after the swap
    swapList.printList();
}

// Call the function to test the SwapList class with integers
testSwapListWithInteger();
