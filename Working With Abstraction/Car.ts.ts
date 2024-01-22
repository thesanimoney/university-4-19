// Define the Engine class to hold information about engine speed and power
class Engine {
    constructor(public speed: number, public power: number) {}
}

// Define the Cargo class to hold information about cargo weight and type
class Cargo {
    constructor(public weight: number, public type: string) {}
}

// Define the Tire class to hold information about tire pressure and age
class Tire {
    constructor(public pressure: number, public age: number) {}
}

// Define the Car class that holds information about model, engine, cargo, and tires
class Car {
    constructor(
        public model: string,
        public engine: Engine,
        public cargo: Cargo,
        public tires: Tire[]
    ) {}
}

// Function to process the input and create an array of Car objects

function processCars(input: string[]): Car[] {
    // Parse the first element of the input array to get the number of cars (n)
    const n = parseInt(input[0]);

    // Initialize an empty array to store Car objects
    const cars: Car[] = [];

    // Loop through each line of input starting from the second line
    for (let i = 1; i <= n; i++) {
        // Destructure the current line of input into individual values
        const [model, speed, power, weight, type, p1, a1, p2, a2, p3, a3, p4, a4] =
            input[i].split(' ');

        // Create an instance of the Engine class with speed and power converted to numbers
        const engine = new Engine(Number(speed), Number(power));

        // Create an instance of the Cargo class with weight converted to a number
        // Note: 'type' is left as a string since it represents the cargo type
        const cargo = new Cargo(Number(weight), type);

        // Create an array of Tire objects, each with pressure and age converted to numbers
        const tires = [
            new Tire(Number(p1), Number(a1)),
            new Tire(Number(p2), Number(a2)),
            new Tire(Number(p3), Number(a3)),
            new Tire(Number(p4), Number(a4)),
        ];

        // Create an instance of the Car class using the gathered information
        const car = new Car(model, engine, cargo, tires);

        // Add the created Car instance to the 'cars' array
        cars.push(car);
    }

    // Return the array of Car objects
    return cars;
}


// Function to filter cars based on the given command (fragile or flamable)
function filterCarsByCommand(cars: Car[], command: string): Car[] {
    if (command === 'fragile') {
        // Filter cars with Cargo Type "fragile" and at least one tire with pressure < 1
        return cars.filter(
            (car) =>
                car.cargo.type === 'fragile' &&
                car.tires.some((tire) => tire.pressure < 1)
        );
    } else if (command === 'flamable') {
        // Filter cars with Cargo Type "flamable" and Engine Power > 250
        return cars.filter(
            (car) => car.cargo.type === 'flamable' && car.engine.power > 250
        );
    } else {
        // Return an empty array for invalid commands
        return [];
    }
}

// Example usage:

const input: string[] = [
    '2',
    'ChevroletAstro 200 180 1000 fragile 1.3 1 1.5 2 1.4 2 1.7 4',
    'Citroen2CV 190 165 1200 fragile 0.9 3 0.85 2 0.95 2 1.1 1',
    'fragile',
];

// Process the input and create an array of Car objects
const cars = processCars(input);

// Get the command from the last line of input
const command = input[input.length - 1];

// Filter cars based on the command and store the result
const result = filterCarsByCommand(cars, command);

// Print the model names of the filtered cars
console.log(result.map((car) => car.model).join('\n'));
