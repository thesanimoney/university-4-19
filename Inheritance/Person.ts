class Person {
    // Fields
    private _name: string;
    private _age: number;

    // Constructor
    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }

    // Property for Name with validation
    get Name(): string {
        return this._name;
    }

    set Name(value: string) {
        // Validate the length of the name
        if (value.length < 3) {
            throw new Error("Name's length should not be less than 3 symbols!");
        }
        this._name = value;
    }

    // Property for Age with validation
    get Age(): number {
        return this._age;
    }

    protected setAge(value: number) {
        // Validate that age is not negative
        if (value < 0) {
            throw new Error("Age must be positive!");
        }
        this._age = value;
    }

    // ToString method override
    toString(): string {
        return `Name: ${this.Name}, Age: ${this.Age}`;
    }
}

class Child extends Person {
    // Constructor (reusing Person class's constructor)
    constructor(name: string, age: number) {
        super(name, age);
    }

    // Override setAge method to add additional validation for Child's age
    protected setAge(value: number) {
        super.setAge(value); // Reusing the base class validation
        // Additional validation for Child's age
        if (value > 15) {
            throw new Error("Child's age must be less than 15!");
        }
    }
}

// Test cases
try {
    const person = new Person("John", 25);
    console.log(person.toString()); // Output: Name: John, Age: 25

    const child = new Child("Alice", 10);
    console.log(child.toString()); // Output: Name: Alice, Age: 10

    // Uncomment the line below to test exception handling for Child's age
    // const invalidChild = new Child("Bob", 16);

    // Uncomment the line below to test exception handling for Name's length
    // const invalidName = new Person("AB", 30);
} catch (error) {
    console.error(error.message);
}
