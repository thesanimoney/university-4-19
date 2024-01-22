// Define the Comparable interface to ensure elements can be compared
interface Comparable {
    compareTo(other: any): number;
}

// Generic data structure class that stores elements of type T extending Comparable
class CustomList<T extends Comparable> {
    private list: T[];

    constructor() {
        this.list = [];
    }

    // Method to add an element to the end of the list
    add(element: T): void {
        this.list.push(element);
    }

    // Method to remove an element at a given index and return the removed element
    remove(index: number): T {
        return this.list.splice(index, 1)[0];
    }

    // Method to check if the list contains a given element
    contains(element: T): boolean {
        return this.list.includes(element);
    }

    // Method to swap elements at two given indices in the list
    swap(index1: number, index2: number): void {
        const temp = this.list[index1];
        this.list[index1] = this.list[index2];
        this.list[index2] = temp;
    }

    // Method to count elements greater than a given element
    countGreaterThan(element: T): number {
        return this.list.filter((item) => item.compareTo(element) > 0).length;
    }

    // Method to find and return the maximum element in the list
    max(): T {
        return this.list.reduce((max, current) => (current.compareTo(max) > 0 ? current : max), this.list[0]);
    }

    // Method to find and return the minimum element in the list
    min(): T {
        return this.list.reduce((min, current) => (current.compareTo(min) < 0 ? current : min), this.list[0]);
    }

    // Method to print all elements in the list, each on a separate line
    print(): void {
        this.list.forEach((element) => console.log(element));
    }
}

// Command Interpreter function that reads and interprets commands for the CustomList
function interpretCommands(commands: string[]): void {
    // Create an instance of the CustomList with string elements
    const customList = new CustomList<string>();

    // Iterate through each command in the provided list
    for (const command of commands) {
        // Split the command into action and parameters
        const [action, ...params] = command.split(' ');

        // Switch statement to execute corresponding operations based on the action
        switch (action) {
            case 'Add':
                customList.add(params[0]);
                break;
            case 'Remove':
                customList.remove(Number(params[0]));
                break;
            case 'Contains':
                console.log(customList.contains(params[0]));
                break;
            case 'Swap':
                customList.swap(Number(params[0]), Number(params[1]));
                break;
            case 'Greater':
                console.log(customList.countGreaterThan(params[0]));
                break;
            case 'Max':
                console.log(customList.max());
                break;
            case 'Min':
                console.log(customList.min());
                break;
            case 'Print':
                customList.print();
                break;
            case 'END':
                return;
        }
    }
}

// Example Input
const inputCommands = [
    'Add aa',
    'Add bb',
    'Add cc',
    'Max',
    'Min',
    'Greater aa',
    'Swap 0 2',
    'Contains aa',
    'Print',
    'END',
];

// Execute the command interpreter with the example input
interpretCommands(inputCommands);
