// Define an interface IPerson with properties for Name and Age
interface IPerson {
    Name: string;
    Age: number;
}

// Define a class Citizen which implements IPerson
class Citizen implements IPerson {
    // Properties from the IPerson interface
    Name: string;
    Age: number;

    // Constructor that takes a string name and an int age
    constructor(name: string, age: number) {
        this.Name = name;
        this.Age = age;
    }
}

// Try to create a new Person (Citizen)
const person: IPerson = new Citizen("John Doe", 25);

