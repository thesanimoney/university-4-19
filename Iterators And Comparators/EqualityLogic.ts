class Person {
    constructor(public name: string, public age: number) {}

    // Override the Equals method to compare Persons based on name and age
    equals(other: Person): boolean {
        return this.name === other.name && this.age === other.age;
    }

    // Override the GetHashCode method to generate a hash code based on name and age
    hashCode(): number {
        // This is a simple example of generating a hash code, not perfect but works for demonstration
        return this.name.length * 31 + this.age;
    }
}

// Read input
const input = ['4', 'Pesho 20', 'Peshp 20', 'Joro 15', 'Pesho 21'];
const N = parseInt(input[0], 10);

// Create SortedSet and HashSet
const sortedSet = new Set<Person>();
const hashSet = new Set<Person>();

// Process input and populate both sets
for (let i = 1; i <= N; i++) {
    const [name, ageStr] = input[i].split(' ');
    const age = parseInt(ageStr, 10);

    const person = new Person(name, age);

    sortedSet.add(person);
    hashSet.add(person);
}

// Output the size of the sets
console.log(sortedSet.size);
console.log(hashSet.size);
