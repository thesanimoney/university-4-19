class Dough {
    // Allowed flour types and baking techniques
    private static readonly ALLOWED_FLOUR_TYPES = ['white', 'wholegrain'];
    private static readonly ALLOWED_BAKING_TECHNIQUES = ['crispy', 'chewy', 'homemade'];

    // Fields to store flour type, baking technique, weight, and calories per gram
    private _flourType: string;
    private _bakingTechnique: string;
    private _weight: number;

    // Constructor to initialize Dough instance with flour type, baking technique, and weight
    constructor(flourType: string, bakingTechnique: string, weight: number) {
        this.flourType = flourType;
        this.bakingTechnique = bakingTechnique;
        this.weight = weight;
    }

    // Getter for calories per gram with data validation
    get caloriesPerGram(): number {
        // Validate flour type and baking technique against allowed values
        // @ts-ignore
        if (!Dough.ALLOWED_FLOUR_TYPES.includes(this._flourType) || !Dough.ALLOWED_BAKING_TECHNIQUES.includes(this._bakingTechnique)) {
            throw new Error('Invalid type of dough.');
        }

        // Validate weight within the specified range
        if (this._weight < 1 || this._weight > 200) {
            throw new Error('Dough weight should be in the range [1..200].');
        }

        // Calculate calories per gram based on modifiers
        let calories = 2; // Base calories
        if (this._flourType === 'white') {
            calories *= 1.5; // Modifier for white flour
        }
        if (this._bakingTechnique === 'crispy') {
            calories *= 0.9; // Modifier for crispy baking technique
        } else if (this._bakingTechnique === 'chewy') {
            calories *= 1.1; // Modifier for chewy baking technique
        }

        return calories;
    }

    // Getter and setter for flour type with validation
    get flourType(): string {
        return this._flourType;
    }

    set flourType(value: string) {
        // Validate flour type against allowed values
        // @ts-ignore
        if (!Dough.ALLOWED_FLOUR_TYPES.includes(value)) {
            throw new Error('Invalid type of dough.');
        }
        this._flourType = value;
    }

    // Getter and setter for baking technique with validation
    get bakingTechnique(): string {
        return this._bakingTechnique;
    }

    set bakingTechnique(value: string) {
        // Validate baking technique against allowed values
        // @ts-ignore
        if (!Dough.ALLOWED_BAKING_TECHNIQUES.includes(value)) {
            throw new Error('Invalid type of dough.');
        }
        this._bakingTechnique = value;
    }

    // Getter and setter for weight with validation
    get weight(): number {
        return this._weight;
    }

    set weight(value: number) {
        // Validate weight within the specified range
        if (value < 1 || value > 200) {
            throw new Error('Dough weight should be in the range [1..200].');
        }
        this._weight = value;
    }
}

// Test case
try {
    // Reading Dough input until "END" command is given
    let input = prompt('Enter Dough (format: FlourType BakingTechnique Weight):');
    while (input !== 'END') {
        const [flourType, bakingTechnique, weightStr] = input.split(' ');
        const weight = Number(weightStr);

        // Creating a Dough instance and calculating calories
        const dough = new Dough(flourType, bakingTechnique, weight);
        const calories = dough.caloriesPerGram;

        // Printing the calculated calories
        console.log(calories.toFixed(2));

        // Reading the next input
        input = prompt('Enter Dough (format: FlourType BakingTechnique Weight):');
    }
} catch (error) {
    // Handling and displaying validation errors
    console.error(error.message);
}
