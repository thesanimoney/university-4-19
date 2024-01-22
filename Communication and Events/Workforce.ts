// Define an interface for Employee
interface IEmployee {
    name: string;
    workHoursPerWeek: number;
}

// Define StandardEmployee class implementing IEmployee
class StandardEmployee implements IEmployee {
    constructor(public name: string) {
        this.workHoursPerWeek = 40;
    }

    public workHoursPerWeek: number;
}

// Define PartTimeEmployee class implementing IEmployee
class PartTimeEmployee implements IEmployee {
    constructor(public name: string) {
        this.workHoursPerWeek = 20;
    }

    public workHoursPerWeek: number;
}

// Define Job class
class Job {
    constructor(public name: string, public hoursOfWorkRequired: number, public employee: IEmployee) {}

    // Method to update job status
    public update(): void {
        this.hoursOfWorkRequired -= this.employee.workHoursPerWeek;

        // Check if the job is done
        if (this.hoursOfWorkRequired <= 0) {
            console.log(`Job ${this.name} done!`);
            // Notify the collection to delete this job
            jobCollection.deleteJob(this);
        }
    }

    // Method to get job status
    public getStatus(): string {
        return `Job: ${this.name} Hours Remaining: ${this.hoursOfWorkRequired}`;
    }
}

// Define a class to hold all jobs
class JobCollection {
    private jobs: Job[] = [];

    // Method to add a job to the collection
    public addJob(job: Job): void {
        this.jobs.push(job);
    }

    // Method to delete a job from the collection
    public deleteJob(job: Job): void {
        const index = this.jobs.indexOf(job);
        if (index !== -1) {
            this.jobs.splice(index, 1);
        }
    }

    // Method to get the status of all jobs
    public getStatus(): string[] {
        return this.jobs.map((job) => job.getStatus());
    }
}

// Create a job collection instance
const jobCollection = new JobCollection();

// Main program to process commands
function processCommands(input: string[]): void {
    for (const command of input) {
        const [action, ...params] = command.split(' ');

        switch (action) {
            case 'Job':
                const [jobName, hoursOfWorkRequired, employeeName] = params;
                const employee = findEmployee(employeeName);
                if (employee) {
                    const job = new Job(jobName, +hoursOfWorkRequired, employee);
                    jobCollection.addJob(job);
                }
                break;
            case 'StandardEmployee':
                const standardEmployee = new StandardEmployee(params[0]);
                employees.push(standardEmployee);
                break;
            case 'PartTimeEmployee':
                const partTimeEmployee = new PartTimeEmployee(params[0]);
                employees.push(partTimeEmployee);
                break;
            case 'Pass':
                // Update each job
                jobCollection.getStatus().forEach((status) => console.log(status));
                jobCollection.getStatus().forEach((job) => job.update());
                break;
            case 'Status':
                // Print the status of all jobs
                jobCollection.getStatus().forEach((status) => console.log(status));
                break;
            case 'End':
                return;
        }
    }
}

// Helper function to find an employee by name
function findEmployee(name: string): IEmployee | undefined {
    return employees.find((employee) => employee.name === name);
}

// List to store all employees
const employees: IEmployee[] = [];

// Example input
const inputCommands: string[] = [
    'StandardEmployee John',
    'PartTimeEmployee Alice',
    'Job FixBugs 50 John',
    'Job WriteDocs 30 Alice',
    'Pass Week',
    'Status',
    'End',
];

// Process the example commands
processCommands(inputCommands);
