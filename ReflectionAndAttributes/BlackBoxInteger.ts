class BlackBoxInteger {
    // Represents the default value for innerValue
    private static DefaultValue = 0;

    // Holds the actual value of the black box
    private innerValue: number;

    // Private constructor to create an instance with a specific innerValue
    private constructor(innerValue: number) {
        this.innerValue = innerValue;
    }

    // Factory method to create an instance with the default value
    private static create(): BlackBoxInteger {
        return new BlackBoxInteger(BlackBoxInteger.DefaultValue);
    }

    // Adds the specified value to the innerValue
    private add(addend: number): void {
        this.innerValue += addend;
    }

    // Subtracts the specified value from the innerValue
    private subtract(subtrahend: number): void {
        this.innerValue -= subtrahend;
    }

    // Multiplies the innerValue by the specified value
    private multiply(multiplier: number): void {
        this.innerValue *= multiplier;
    }

    // Divides the innerValue by the specified value
    private divide(divider: number): void {
        this.innerValue /= divider;
    }

    // Performs a bitwise left shift on the innerValue
    private leftShift(shifter: number): void {
        this.innerValue <<= shifter;
    }

    // Performs a bitwise right shift on the innerValue
    private rightShift(shifter: number): void {
        this.innerValue >>= shifter;
    }

    // Gets the current value of innerValue
    public getInnerValue(): number {
        return this.innerValue;
    }
}

class BlackBoxInvoker {
    // Holds an instance of the BlackBoxInteger class
    private blackBox: BlackBoxInteger;

    // Constructor to create an instance of BlackBoxInvoker
    constructor() {
        // Creates an instance of BlackBoxInteger using the factory method
        this.blackBox = BlackBoxInteger.create();
    }

    // Invokes a command and prints the result
    public invokeCommand(command: string): void {
        // Parses the command into methodName and value
        const [methodName, valueStr] = command.split('_');
        const value = parseInt(valueStr, 10);

        // Checks if the methodName corresponds to a function in BlackBoxInteger
        if (this.blackBox[methodName] && typeof this.blackBox[methodName] === 'function') {
            // Use a proxy to access private methods
            const proxy = new Proxy(this.blackBox, {
                get: (target, property) => {
                    // Intercept method calls and update innerValue
                    const method = target[property];
                    if (typeof method === 'function') {
                        return (...args: any[]) => {
                            method.apply(target, args);
                            return target.getInnerValue();
                        };
                    }
                    return method;
                },
            });

            // Invoke the private method through the proxy
            proxy[methodName](value);
        }

        // Print the current value of innerValue
        console.log(this.blackBox.getInnerValue());
    }
}

// Example Usage:

// Create an instance of BlackBoxInvoker
const invoker = new BlackBoxInvoker();

// Read commands until "END" is encountered
const inputCommands: string[] = [
    'Add_999999',
    'Subtract_19',
    'Divide_4',
    'Multiply_2',
    'RightShift_1',
    'LeftShift_3',
    'END',
];

// Process each command using the invoker
for (const command of inputCommands) {
    if (command === 'END') {
        break;
    }
    invoker.invokeCommand(command);
}
