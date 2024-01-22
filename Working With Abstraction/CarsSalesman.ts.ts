class Engine {
    model: string;
    power: number;
    displacement?: number;
    efficiency?: string;

    constructor(model: string, power: number, displacement?: number, efficiency?: string) {
        this.model = model;
        this.power = power;
        this.displacement = displacement;
        this.efficiency = efficiency;
    }
}

class Car {
    model: string;
    engine: Engine;
    weight?: number;
    color?: string;

    constructor(model: string, engine: Engine, weight?: number, color?: string) {
        this.model = model;
        this.engine = engine;
        this.weight = weight;
        this.color = color;
    }

    printInfo() {
        console.log(`${this.model}:`);
        console.log(` ${this.engine.model}:`);
        console.log(` Power: ${this.engine.power}`);
        console.log(` Displacement: ${this.engine.displacement !== undefined ? this.engine.displacement : 'n/a'}`);
        console.log(` Efficiency: ${this.engine.efficiency !== undefined ? this.engine.efficiency : 'n/a'}`);
        console.log(` Weight: ${this.weight !== undefined ? this.weight : 'n/a'}`);
        console.log(` Color: ${this.color !== undefined ? this.color : 'n/a'}`);
    }
}

function processInput(input: string[]): void {
    let engines: Engine[] = [];
    let cars: Car[] = [];

    const engineCount = Number(input[0]);

    for (let i = 1; i <= engineCount; i++) {
        const [model, power, displacement, efficiency] = input[i].split(' ');
        engines.push(new Engine(model, Number(power), Number(displacement), efficiency));
    }

    const carCount = Number(input[engineCount + 1]);

    for (let i = engineCount + 2; i < engineCount + 2 + carCount; i++) {
        const [carModel, engineModel, weight, color] = input[i].split(' ');

        // Find the engine using a custom find function
        const engine = findEngine(engines, engineModel);

        cars.push(new Car(carModel, engine, Number(weight), color));
    }

    cars.forEach((car) => car.printInfo());
}

// Find engine function
function findEngine(engines: Engine[], model: string): Engine | undefined {
    for (let i = 0; i < engines.length; i++) {
        if (engines[i].model === model) {
            return engines[i];
        }
    }
    return undefined;
}

const input = [
    '2',
    'V8-101 220 50',
    'V4-33 140 28 B',
    '3',
    'FordFocus V4-33 1300 Silver',
    'FordMustang V8-101',
    'VolkswagenGolf V4-33 Orange',
];

processInput(input);
