// Define the King class
class King {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    // Method to respond to an attack
    public respondToAttack(): void {
        console.log(`King ${this._name} is under attack!`);
    }
}

// Define the RoyalGuard class
class RoyalGuard {
    private _name: string;
    private _isAlive: boolean = true;

    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    public get isAlive(): boolean {
        return this._isAlive;
    }

    // Method to respond to an attack
    public respondToAttack(): void {
        if (this._isAlive) {
            console.log(`Royal Guard ${this._name} is defending!`);
        }
    }

    // Method to "kill" the royal guard
    public kill(): void {
        this._isAlive = false;
    }
}

// Define the Footman class
class Footman {
    private _name: string;
    private _isAlive: boolean = true;

    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    public get isAlive(): boolean {
        return this._isAlive;
    }

    // Method to respond to an attack
    public respondToAttack(): void {
        if (this._isAlive) {
            console.log(`Footman ${this._name} is panicking!`);
        }
    }

    // Method to "kill" the footman
    public kill(): void {
        this._isAlive = false;
    }
}

// Main program to process commands
function processCommands(input: string[]): void {
    // Extract the king's name from the input
    const kingName = input.shift() || '';
    const king = new King(kingName);

    // Extract royal guard and footman names from the input
    const royalGuards = input.shift()?.split(' ').map((name) => new RoyalGuard(name)) || [];
    const footmen = input.shift()?.split(' ').map((name) => new Footman(name)) || [];

    // Combine royal guards and footmen into a single array
    const units = [...royalGuards, ...footmen];

    // Helper function to print responses of all living units
    function printResponses(): void {
        royalGuards.forEach((guard) => guard.respondToAttack());
        footmen.forEach((footman) => footman.respondToAttack());
    }

    // Process each command in the input
    for (const command of input) {
        const [action, ...params] = command.split(' ');

        switch (action) {
            case 'Attack':
                // King responds to an attack
                king.respondToAttack();
                // All units respond to an attack
                printResponses();
                break;
            case 'Kill':
                // Extract the unit name from the command parameters
                const [unitName] = params;
                // Find the unit in the array
                const unit = units.find((u) => u.name === unitName);
                // If the unit is found, "kill" it
                if (unit) {
                    unit.kill();
                }
                break;
        }
    }
}

// Example input
const inputCommands: string[] = [
    'Arthur',
    'Leory Kyrill Til',
    'Rick',
    'Attack King',
    'Kill Rick',
    'End',
];

// Process the example commands
processCommands(inputCommands);
