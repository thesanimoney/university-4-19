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

// Function to test the SwapList class with strings
function testSwapListWithString() {
    // Read the number of strings from the console
    const n: number = Number(prompt("Enter the number of strings:"));

    // Validate if n is a positive number
    if (isNaN(n) || n <= 0) {
        console.error("Please enter a valid positive number for the count of strings.");
        return;
    }

    // Create a SwapList<string> instance
    const swapList = new SwapList<string>();

    // Read each string from the console and add it to the list
    for (let i = 0; i < n; i++) {
        const inputString: string = prompt(`Enter string ${i + 1}:`);
        swapList.add(inputString);
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

// Call the function to test the SwapList class with strings
testSwapListWithString();
