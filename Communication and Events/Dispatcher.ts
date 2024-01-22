// Define the event handler delegate
type NameChangeEventHandler = (sender: object, args: NameChangeEventArgs) => void;

// Define the event arguments class
class NameChangeEventArgs {
    constructor(public name: string) {}
}

// Define the Dispatcher class
class Dispatcher {
    // Define the event using the delegate
    public event: NameChangeEventHandler | undefined;

    private _name: string = '';

    // Property for the Dispatcher's name
    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        if (this._name !== value) {
            // Call the OnNameChange method to fire the event
            this.onNameChange(new NameChangeEventArgs(value));
        }

        this._name = value;
    }

    // Method to fire the event
    protected onNameChange(args: NameChangeEventArgs): void {
        // Check if there are any subscribers to the event
        if (this.event) {
            // Fire the event
            this.event(this, args);
        }
    }
}

// Define the Handler class
class Handler {
    // Method to handle the event
    public onDispatcherNameChange(sender: object, args: NameChangeEventArgs): void {
        console.log(`Dispatcher's name changed to ${args.name}.`);
    }
}

// Main program
const dispatcher = new Dispatcher();
const handler = new Handler();

// Add the handler's method to the NameChange event
dispatcher.event = handler.onDispatcherNameChange.bind(handler);

// Read names from the console until "End" is entered
let input: string;
while ((input = prompt("Enter a name (type 'End' to finish):") || '') !== 'End') {
    // Set the Dispatcher's name (this will trigger the event)
    dispatcher.name = input;
}
