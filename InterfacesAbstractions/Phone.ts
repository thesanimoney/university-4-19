// Interface for calling functionality
interface Callable {
    call(number: string): void;
}

// Interface for browsing functionality
interface Browsable {
    browse(site: string): void;
}

// Class representing a Smartphone implementing Callable and Browsable
class Smartphone implements Callable, Browsable {
    // Array to store phone numbers
    private phoneNumbers: string[];

    // Array to store websites
    private websites: string[];

    // Constructor to initialize phone numbers and websites
    constructor(phoneNumbers: string[], websites: string[]) {
        this.phoneNumbers = phoneNumbers;
        this.websites = websites;
    }

    // Implementation of the call method from Callable interface ^\d+$:
    // The entire string must consist of one or more digits from the beginning (^) to the end ($).
    call(number: string): void {
        if (/^\d+$/.test(number)) {
            console.log(`Calling... ${number}`);
        } else {
            console.log("Invalid number!");
        }
    }

    // Implementation of the browse method from Browsable interface
    browse(site: string): void {
        if (/^\d+$/.test(site)) {
            console.log("Invalid URL!");
        } else {
            console.log(`Browsing: ${site}!`);
        }
    }

    // Method to perform calling and browsing based on the input
    performActions(): void {
        this.phoneNumbers.forEach(number => this.call(number));
        this.websites.forEach(site => this.browse(site));
    }
}

// Example usage
const inputPhoneNumbers = "0882134215 0882134333 08992134215 0558123 3333 1".split(" ");
const inputWebsites = "http://softuni.bg http://youtube.com http://www.g00gle.com".split(" ");

const smartphone = new Smartphone(inputPhoneNumbers, inputWebsites);
smartphone.performActions();
