// Custom Stack implementation
class CustomStack<T> implements Iterable<T> {
    private stack: T[];

    // Constructor initializes an empty stack
    constructor() {
        this.stack = [];
    }

    // Push method adds an element to the top of the stack
    push(element: T): void {
        this.stack.push(element);
    }

    // Pop method returns the top element and removes it
    pop(): T | undefined {
        return this.stack.pop();
    }

    // Implementation of the Iterable interface
    [Symbol.iterator](): Iterator<T> {
        let index = this.stack.length - 1; // Start from the top of the stack

        // Custom iterator
        return {
            next: (): IteratorResult<T> => {
                if (index >= 0) {
                    return { value: this.stack[index--], done: false };
                } else {
                    return { value: undefined as any, done: true };
                }
            },
        };
    }
}

// Process input commands
function processCommands(commands: string[]): void {
    const customStack = new CustomStack<number>();

    for (const command of commands) {
        const [action, ...params] = command.split(' ');

        try {
            switch (action) {
                case 'Push':
                    processPushCommand(customStack, params);
                    break;
                case 'Pop':
                    processPopCommand(customStack);
                    break;
                case 'END':
                    processEndCommand(customStack);
                    break;
                default:
                    throw new Error(`Invalid command: ${action}`);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}

// Process 'Push' command
function processPushCommand(stack: CustomStack<number>, params: string[]): void {
    const elements = params.join('').split(',').map((el) => parseInt(el.trim()));
    elements.forEach((element) => stack.push(element));
}

// Process 'Pop' command
function processPopCommand(stack: CustomStack<number>): void {
    const poppedElement = stack.pop();
    if (poppedElement === undefined) {
        console.log('No elements');
    } else {
        console.log(poppedElement);
    }
}

// Process 'END' command
function processEndCommand(stack: CustomStack<number>): void {
    // Output the stack twice
    stack.forEach((element) => console.log(element));
    stack.forEach((element) => console.log(element));
}

// Example Input
const inputCommands = ['Push 1, 2, 3, 4', 'Pop', 'Pop', 'END'];

// Execute command processing
processCommands(inputCommands);


