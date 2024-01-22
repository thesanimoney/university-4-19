// Define an interface IPerson with properties for Name and Age
interface IPerson {
    Name: string;
    Age: number;
}

// Define an interface IIdentifiable with a string property Id
interface IIdentifiable {
    Id: string;
}

// Define an interface IBirthable with a string property Birthdate
interface IBirthable {
    Birthdate: string;
}

// Define a class Citizen which implements IPerson, IIdentifiable, and IBirthable
class Citizen implements IPerson, IIdentifiable, IBirthable {
    // Properties from the IPerson interface
    Name: string;
    Age: number;

    // Properties from the IIdentifiable interface
    Id: string;

    // Properties from the IBirthable interface
    Birthdate: string;

    // Constructor that takes name, age, id, and birthdate
    constructor(name: string, age: number, id: string, birthdate: string) {
        this.Name = name;
        this.Age = age;
        this.Id = id;
        this.Birthdate = birthdate;
    }
}

// Example of creating a new Citizen with the new parameters
const citizen: IPerson & IIdentifiable & IBirthable = new Citizen("John Doe", 25, "12345", "1990-01-01");

// Log the created citizen
console.log(citizen);








