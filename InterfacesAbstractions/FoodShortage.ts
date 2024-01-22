/**
 * Interface representing a buyer with a name, age, and food purchasing functionality.
 */
interface IBuyer {
    name: string;
    food: number;
    BuyFood(): void;
}

/**
 * Class representing a citizen with a name, age, ID, birthdate, and food purchasing functionality.
 */
class Citizen implements IBuyer {
    constructor(public name: string, public age: number, public id: string, public birthdate: string) {
        this.food = 0;
    }

    food: number;

    /**
     * Implements the BuyFood method for citizens, increasing food by 10.
     */
    BuyFood(): void {
        this.food += 10;
    }
}

/**
 * Class representing a rebel with a name, age, group, and food purchasing functionality.
 */
class Rebel implements IBuyer {
    constructor(public name: string, public age: number, public group: string) {
        this.food = 0;
    }

    food: number;

    /**
     * Implements the BuyFood method for rebels, increasing food by 5.
     */
    BuyFood(): void {
        this.food += 5;
    }
}

/**
 * Function to calculate the total amount of food purchased by the given buyers.
 * @param buyers Array of IBuyer objects.
 * @param names Array of names representing the buyers who purchased food.
 * @returns Total amount of food purchased.
 */
function calculateTotalFood(buyers: IBuyer[], names: string[]): number {
    for (const name of names) {
        const buyer = buyers.find((b) => b.name === name);
        if (buyer) {
            buyer.BuyFood();
        }
    }

    return buyers.reduce((totalFood, buyer) => totalFood + buyer.food, 0);
}

// Example usage
const n = 2; // Number of people
const input: string[] = [
    'Pesho 25 8904041303 04/04/1989',
    'Stancho 27 WildMonkeys',
    'Pesho',
    'Gosho',
    'Pesho',
    'End',
];

const buyers: IBuyer[] = [];

// Parse input data and create buyer objects
// Loop through the input data to create buyer objects
for (let i = 0; i < n; i++) {
    // Split the input data into an array
    const data = input[i].split(' ');

    // Check the length of the array to determine the type of buyer
    if (data.length === 4) {
        // If the length is 4, create a Citizen object
        const [name, age, id, birthdate] = data;
        // Parse age to an integer and create a new Citizen object
        buyers.push(new Citizen(name, parseInt(age), id, birthdate));
    } else if (data.length === 3) {
        // If the length is 3, create a Rebel object
        const [name, age, group] = data;
        // Parse age to an integer and create a new Rebel object
        buyers.push(new Rebel(name, parseInt(age), group));
    }
}

// Extract purchases from the input
const purchases = input.slice(n + 1, input.indexOf('End'));


// Calculate and print the total amount of food purchased
const totalFood = calculateTotalFood(buyers, purchases);
console.log('Total amount of food purchased:', totalFood);
