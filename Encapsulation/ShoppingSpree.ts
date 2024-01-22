// Class representing a person
class Person {
    private _name: string;
    private _money: number;
    private _bag: string[];

    constructor(name: string, money: number) {
        this.name = name;
        this.money = money;
        this._bag = [];
    }

    // Getter and setter for name with validation
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (value.trim() === '') {
            throw new Error('Name cannot be empty.');
        }
        this._name = value;
    }

    // Getter and setter for money with validation
    get money(): number {
        return this._money;
    }

    set money(value: number) {
        if (value < 0) {
            throw new Error('Money cannot be negative.');
        }
        this._money = value;
    }

    // Getter for the bag of products
    get bag(): string[] {
        return this._bag;
    }

    // Method to handle a person buying a product
    buyProduct(product: Product): void {
        if (this._money >= product.cost) {
            // If the person can afford the product, add it to the bag and deduct the cost from the money
            this._bag.push(product.name);
            this._money -= product.cost;
            console.log(`${this._name} bought ${product.name}`);
        } else {
            // If the person cannot afford the product, print an appropriate message
            console.log(`${this._name} can't afford ${product.name}`);
        }
    }
}

// Class representing a product
class Product {
    private _name: string;
    private _cost: number;

    constructor(name: string, cost: number) {
        this.name = name;
        this.cost = cost;
    }

    // Getter and setter for name with validation
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (value.trim() === '') {
            throw new Error('Name cannot be empty.');
        }
        this._name = value;
    }

    // Getter and setter for cost
    get cost(): number {
        return this._cost;
    }

    set cost(value: number) {
        this._cost = value;
    }
}

// Example usage with step-by-step data entry
try {
    // Step 1: Enter people data
    const personDataInput = prompt('Enter people data (format: Name1=Money1;Name2=Money2):');
    const peopleData = personDataInput.split(';').map(person => {
        const [name, moneyStr] = person.split('=');
        const money = Number(moneyStr);
        return new Person(name, money);
    });

    // Step 2: Enter product data
    const productDataInput = prompt('Enter product data (format: Name1=Cost1;Name2=Cost2):');
    const productsData = productDataInput.split(';').map(product => {
        const [name, costStr] = product.split('=');
        const cost = Number(costStr);
        return new Product(name, cost);
    });

    // Step 3: Make purchases
    const purchaseInput = prompt('Enter purchases (format: PersonName ProductName):');
    const [personName, productName] = purchaseInput.split(' ');

    // Find the person and product based on input
    // @ts-ignore
    const person = peopleData.find(p => p.name === personName);
    // @ts-ignore
    const product = productsData.find(p => p.name === productName);

    // Make the purchase if both person and product are found
    if (person && product) {
        person.buyProduct(product);
    } else {
        console.log('Invalid person or product.');
    }

    // Step 4: Print results
    peopleData.forEach(person => {
        const boughtProducts = person.bag.length > 0 ? person.bag.join(', ') : 'Nothing bought';
        console.log(`${person.name} - ${boughtProducts}`);
    });
} catch (error) {
    // Handle and display validation errors
    console.error(error.message);
}
