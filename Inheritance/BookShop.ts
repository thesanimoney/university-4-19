class Book {
    // Fields
    protected _title: string;
    protected _author: string;
    public _price: number;

    // Constructor
    constructor(title: string, author: string, price: number) {
        // Set initial values using the properties' setters to enforce validations
        this.Title = title;
        this.Author = author;
        this.Price = price;
    }

    // Property for Title with validation
    get Title(): string {
        return this._title;
    }

    set Title(value: string) {
        // Validate title length
        if (value.length < 3) {
            throw new Error("Title not valid!");
        }
        this._title = value;
    }

    // Property for Author with validation
    get Author(): string {
        return this._author;
    }

    set Author(value: string) {
        // Validate author name
        if (/^\d/.test(value.split(" ")[1])) {
            throw new Error("Author not valid!");
        }
        this._author = value;
    }

    // Property for Price with validation
    get Price(): number {
        return this._price;
    }

    set Price(value: number) {
        // Validate price
        if (value <= 0) {
            throw new Error("Price not valid!");
        }
        this._price = value;
    }

    // Format price to two decimal places
    protected formatPrice(): string {
        return this.Price.toFixed(2);
    }

    // Display book information
    toString(): string {
        return `Type: Book
Title: ${this.Title}
Author: ${this.Author}
Price: ${this.formatPrice()}`;
    }
}

class GoldenEditionBook extends Book {
    // Constructor for GoldenEditionBook
    constructor(title: string, author: string, price: number) {
        // Call the base class constructor
        super(title, author, price);
    }

    // Override Price property to provide 30% higher price for GoldenEditionBook
    get Price(): number {
        // @ts-ignore
        return super._price * 1.3;
    }

    // Display golden edition book information
    toString(): string {
        return `Type: GoldenEditionBook
Title: ${this.Title}
Author: ${this.Author}
Price: ${this.getPriceWithModifier()}`;
    }

    // Invoke the protected method in the base class
    private getPriceWithModifier(): string {
        return this.formatPrice();
    }
}

// Test cases
try {
    // Create a regular book
    const book = new Book("Life of Pesho", "Petur Ivanov", 20);
    console.log(book.toString());

    // Create a golden edition book
    const goldenBook = new GoldenEditionBook("Life of Pesho", "Petur Ivanov", 20);
    console.log(goldenBook.toString());
} catch (error) {
    // Handle and display exceptions
    console.error(error.message);
}
