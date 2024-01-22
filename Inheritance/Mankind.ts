// Base class representing a human
class Human {
    // Protected fields to store first name and last name
    protected _firstName: string;
    protected _lastName: string;

    // Constructor to initialize first name and last name
    constructor(firstName: string, lastName: string) {
        // Use the setters to perform validations
        this.FirstName = firstName;
        this.LastName = lastName;
    }

    // Getter and setter for the first name
    get FirstName(): string {
        return this._firstName;
    }

    set FirstName(value: string) {
        // Validation for the first name
        if (!/[A-Z]/.test(value[0])) {
            throw new Error("Expected upper case letter! Argument: firstName");
        }
        if (value.length < 4) {
            throw new Error("Expected length at least 4 symbols! Argument: firstName");
        }
        this._firstName = value;
    }

    // Getter and setter for the last name
    get LastName(): string {
        return this._lastName;
    }

    set LastName(value: string) {
        // Validation for the last name
        if (!/[A-Z]/.test(value[0])) {
            throw new Error("Expected upper case letter! Argument: lastName");
        }
        if (value.length < 3) {
            throw new Error("Expected length at least 3 symbols! Argument: lastName");
        }
        this._lastName = value;
    }
}

// Class representing a student, inheriting from Human
class Student extends Human {
    // Private field for faculty number
    private _facultyNumber: string;

    // Constructor to initialize properties, utilizing the base class constructor
    constructor(firstName: string, lastName: string, facultyNumber: string) {
        super(firstName, lastName);
        // Use the setter to perform validations
        this.FacultyNumber = facultyNumber;
    }

    // Getter and setter for the faculty number
    get FacultyNumber(): string {
        return this._facultyNumber;
    }

    set FacultyNumber(value: string) {
        // Validation for the faculty number
        if (!/^[A-Za-z0-9]+$/.test(value) || value.length < 5 || value.length > 10) {
            throw new Error("Invalid faculty number!");
        }
        this._facultyNumber = value;
    }

    // Override the toString method to display student information
    toString(): string {
        return `First Name: ${this.FirstName}\nLast Name: ${this.LastName}\nFaculty number: ${this.FacultyNumber}`;
    }
}

// Class representing a worker, inheriting from Human
// @ts-ignore
class Worker extends Human {
    // Private fields for week salary and work hours per day
    private _weekSalary: number;
    private _workHoursPerDay: number;

    // Constructor to initialize properties, utilizing the base class constructor
    constructor(firstName: string, lastName: string, weekSalary: number, workHoursPerDay: number) {
        super(firstName, lastName);
        // Use the setters to perform validations
        this.WeekSalary = weekSalary;
        this.WorkHoursPerDay = workHoursPerDay;
    }

    // Getter and setter for the week salary
    get WeekSalary(): number {
        return this._weekSalary;
    }

    set WeekSalary(value: number) {
        // Validation for the week salary
        if (value <= 10) {
            throw new Error("Expected value mismatch! Argument: weekSalary");
        }
        this._weekSalary = value;
    }

    // Getter and setter for the work hours per day
    get WorkHoursPerDay(): number {
        return this._workHoursPerDay;
    }

    set WorkHoursPerDay(value: number) {
        // Validation for the work hours per day
        if (value < 1 || value > 12) {
            throw new Error("Expected value mismatch! Argument: workHoursPerDay");
        }
        this._workHoursPerDay = value;
    }

    // Private method to calculate salary per hour
    private calculateSalaryPerHour(): number {
        return this.WeekSalary / (5 * this.WorkHoursPerDay);
    }

    // Override the toString method to display worker information
    toString(): string {
        return `First Name: ${this.FirstName}\nLast Name: ${this.LastName}\nWeek Salary: ${this.WeekSalary.toFixed(2)}\nHours per day: ${this.WorkHoursPerDay}\nSalary per hour: ${this.calculateSalaryPerHour().toFixed(2)}`;
    }
}

// Test cases
try {
    // Student input
    const studentInput = "Ivan Ivanov 08";
    const [studentFirstName, studentLastName, studentFacultyNumber] = studentInput.split(" ");
    const student = new Student(studentFirstName, studentLastName, studentFacultyNumber);

    console.log("Student Info:");
    console.log(student.toString());

    // Worker input
    const workerInput = "Pesho Kirov 1590 10";
    const [workerFirstName, workerLastName, workerWeekSalaryStr, workerWorkHoursPerDayStr] = workerInput.split(" ");
    const workerWeekSalary = Number(workerWeekSalaryStr);
    const workerWorkHoursPerDay = Number(workerWorkHoursPerDayStr);

    // Create a Worker instance
    // @ts-ignore
    const workerInstance = new Worker(workerFirstName, workerLastName, workerWeekSalary, workerWorkHoursPerDay);

    console.log("\nWorker Info:");
    console.log(workerInstance.toString());
} catch (error) {
    console.error(error.message);
}
