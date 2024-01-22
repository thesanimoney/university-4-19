// Interface for objects with a birthdate
interface Birthable {
    birthdate: string;
}

// Interface for objects with an ID
interface Identifiable {
    id: string;
}

// Class representing a Citizen
class Citizen implements Birthable, Identifiable {
    constructor(public name: string, public age: number, public id: string, public birthdate: string) {}
}

// Class representing a Robot
class Robot implements Identifiable {
    constructor(public model: string, public id: string) {}
}

// Class representing a Pet
class Pet implements Birthable {
    constructor(public name: string, public birthdate: string) {}
}

// Class for handling birthday celebrations
class BirthdayCelebration {
    private birthdates: string[] = [];

    /**
     * Processes the input lines to determine birthdates in the specified year.
     * @param inputLines - Array of input lines.
     * @param yearToCheck - The year to check for birthdates.
     */
    processInput(inputLines: string[], yearToCheck: number): void {
        // Iterate through each input line
        for (const line of inputLines) {
            // Check if the end command is received
            if (line === 'End') {
                break;
            }

            // Split the line into tokens (type, name, age/id/model, and birthdate)
            const tokens = line.split(' ');

            // Determine the type and create the corresponding object
            if (tokens[0] === 'Citizen') {
                const citizen = new Citizen(tokens[1], parseInt(tokens[2]), tokens[3], tokens[4]);
                this.checkBirthdate(citizen, yearToCheck);
            } else if (tokens[0] === 'Robot') {
                const robot = new Robot(tokens[1], tokens[2]);
                // Robots don't have birthdates
            } else if (tokens[0] === 'Pet') {
                const pet = new Pet(tokens[1], tokens[2]);
                this.checkBirthdate(pet, yearToCheck);
            }
        }

        // Print birthdates
        this.printBirthdates();
    }

    /**
     * Checks if the object's birthdate corresponds to the specified year.
     * @param obj - Object with a birthdate.
     * @param yearToCheck - The year to check for birthdates.
     */
    private checkBirthdate(obj: Birthable, yearToCheck: number): void {
        const birthYear = new Date(obj.birthdate).getFullYear();
        if (birthYear === yearToCheck) {
            this.birthdates.push(obj.birthdate);
        }
    }

    /**
     * Prints the birthdates to the console.
     */
    private printBirthdates(): void {
        // Iterate through birthdates and print each one
        for (const birthdate of this.birthdates) {
            console.log(birthdate);
        }
    }
}

// Example usage
const birthdayCelebration = new BirthdayCelebration();
const input = [
    'Citizen Pesho 22 9010101122 10/10/1990',
    'Pet Sharo 13/11/2005',
    'Robot MK-13 558833251',
    'End',
    '1990'
];

// Process the input and print birthdates
birthdayCelebration.processInput(input, parseInt(input[input.length - 1]));
