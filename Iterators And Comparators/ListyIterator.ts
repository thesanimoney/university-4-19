// Define the IEnumerable interface
interface IEnumerable<T> {
    // Custom GetEnumerator method using yield return
    [Symbol.iterator](): Iterator<T>;
}

// ListyIterator class implementing IEnumerable interface
class ListyIterator<T> implements IEnumerable<T> {
    private collection: T[];
    private index: number;

    // Constructor to initialize the ListyIterator with a collection (default is an empty array)
    constructor(elements: T[] = []) {
        this.collection = elements;
        this.index = 0; // Default index is 0
    }

    // Move method moves the internal index to the next position if available, returns true if moved, false otherwise
    move(): boolean {
        if (this.hasNext()) {
            this.index++;
            return true;
        }
        return false;
    }

    // HasNext method checks if there is a next index available
    hasNext(): boolean {
        return this.index < this.collection.length - 1;
    }

    // Print method prints the element at the current internal index, throws an exception if the collection is empty
    print(): void {
        if (this.collection.length === 0) {
            throw new Error("Invalid Operation!");
        }
        console.log(this.collection[this.index]);
    }

    // Implementation of the IEnumerable interface
    // Custom iterator using yield return
    * [Symbol.iterator](): Iterator<T> {
        for (const element of this.collection) {
            yield element;
        }
    }
}

// Command interpreter function that reads and interprets commands for the ListyIterator
// Command interpreter function that reads and interprets commands for the ListyIterator
function interpretCommands(commands: string[]): void {
    let listIterator: ListyIterator<string>;

    // Iterate through each command in the provided list
    for (const command of commands) {
        // Split the command into action and parameters
        const [action, ...params] = command.split(' ');

        try {
            // Switch block to handle different commands
            switch (action) {
                case 'Create':
                    // Create a new ListyIterator with the specified elements
                    const elements = params.map((el) => el.trim());
                    listIterator = new ListyIterator(elements);
                    break;
                case 'Move':
                    // Move the internal index and print the result (true/false)
                    console.log(listIterator.move());
                    break;
                case 'HasNext':
                    // Check if there is a next index and print the result (true/false)
                    console.log(listIterator.hasNext());
                    break;
                case 'Print':
                    // Print the element at the current internal index
                    listIterator.print();
                    break;
                case 'PrintAll':
                    // Print all elements on a single line separated by spaces
                    console.log([...listIterator].join(' '));
                    break;
                case 'END':
                    // End the command interpretation loop
                    return;
                default:
                    // Throw an error for invalid commands
                    throw new Error(`Invalid command: ${action}`);
            }
        } catch (error) {
            // Catch and print any exceptions thrown during command execution
            console.error(error.message);
        }
    }
}


// Example Input
const inputCommands = ['Create 1 2 3 4 5', 'Move', 'PrintAll', 'END'];

// Execute the command interpreter with the example input
interpretCommands(inputCommands);
