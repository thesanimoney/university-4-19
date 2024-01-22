// Define a class representing the hospital system
class Hospital {
    // Private data members to store information about departments and doctors
    // The outer map (keyed by strings) represents departments. Each department has an associated inner map.
    // The inner map (keyed by numbers) represents the floor numbers within a department. Each floor has an associated array of strings representing the names of doctors on that floor.
    // @ts-ignore
    private departments = new Map<string, Map<number, string[]>>();
    // @ts-ignore
    private doctors = new Map<string, string[]>();

    // Method to add a new patient to the hospital system
    addPatient(department: string, doctor: string, patient: string) {
        // Ensure the department exists; if not, initialize it
        this.initializeDepartment(department);

        // Retrieve the rooms for the specified department
        // @ts-ignore
        const rooms = this.departments.get(department) as Map<number, string[]>;

        // Assign the patient to an available bed in the department
        this.assignPatientToRoom(rooms, patient);

        // Add the patient to the list of patients under the specified doctor
        this.addPatientToDoctor(doctor, patient);
    }

    // Private method to initialize a department if it doesn't exist
    private initializeDepartment(department: string) {
        if (!this.departments.has(department)) {
            // @ts-ignore
            this.departments.set(department, new Map());
        }
    }

    // Private method to assign a patient to an available bed in a department
    // @ts-ignore
    private assignPatientToRoom(rooms: Map<number, string[]>, patient: string) {
        for (const [, beds] of rooms) {
            // Check if the current room has available beds
            if (beds.length < 3) {
                // Assign the patient to the first available bed in the room
                beds.push(patient);
                break;
            }
        }
    }

    // Private method to add a patient to the list of patients under a doctor
    private addPatientToDoctor(doctor: string, patient: string) {
        // Ensure the doctor exists; if not, initialize their list of patients
        this.initializeDoctor(doctor);

        // Retrieve the list of patients under the specified doctor
        const doctorPatients = this.doctors.get(doctor) as string[];

        // Add the patient to the list of patients under the doctor
        doctorPatients.push(patient);
    }

    // Private method to initialize a doctor if they don't exist
    private initializeDoctor(doctor: string) {
        if (!this.doctors.has(doctor)) {
            this.doctors.set(doctor, []);
        }
    }

    // Method to print all patients in a department
    printDepartment(department: string) {
        // Retrieve the rooms for the specified department
        const rooms = this.departments.get(department);

        // If the department exists, retrieve and print all patients
        if (rooms) {
            const patients = this.getPatientsFromRooms(rooms);
            console.log(patients.join('\n'));
        }
    }

    // Private method to get all patients from the rooms in a department
    // @ts-ignore
    private getPatientsFromRooms(rooms: Map<number, string[]>) {
        const patients: string[] = [];
        // Iterate through each room and collect patients
        for (const [, beds] of rooms) {
            patients.push(...beds);
        }
        return patients;
    }

    // Method to print all patients in a specific room in alphabetical order
    printRoom(department: string, room: number) {
        // Retrieve the rooms for the specified department
        const rooms = this.departments.get(department);

        // If the department exists and the room has patients, print in alphabetical order
        if (rooms && rooms.has(room)) {
            const patients = rooms.get(room) as string[];
            console.log(patients.sort().join('\n'));
        }
    }

    // Method to print all patients under a specific doctor in alphabetical order
    printDoctor(doctor: string) {
        // Retrieve the list of patients under the specified doctor
        const patients = this.doctors.get(doctor);

        // If the doctor has patients, print them in alphabetical order
        if (patients) {
            console.log(patients.sort().join('\n'));
        }
    }
}

// Function to process input and execute commands
function processInput(input: string[]) {
    // Create an instance of the Hospital class
    const hospital = new Hospital();

    // Loop through input lines to add patients to the hospital system
    for (const line of input) {
        // Stop processing when "Output" command is encountered
        if (line === 'Output') {
            break;
        }

        // Parse department, doctor, and patient information from the input line
        const [department, doctor, patient] = line.split(' ');

        // Add the patient to the hospital system
        hospital.addPatient(department, doctor, patient);
    }

    // Loop through output commands and execute corresponding print methods
    for (let i = input.indexOf('Output') + 1; i < input.length; i++) {
        const command = input[i].split(' ');

        // Stop processing when "End" command is encountered
        if (command[0] === 'End') {
            break;
        }

        // Execute the corresponding print method based on the command
        switch (command.length) {
            case 1:
                hospital.printDepartment(command[0]);
                break;
            case 2:
                hospital.printRoom(command[0], parseInt(command[1], 10));
                break;
            case 3:
                hospital.printDoctor(`${command[1]} ${command[2]}`);
                break;
        }
    }
}

// Example input data
const inputData: string[] = [
    'Cardiology Petar Petrov Ventsi',
    'Oncology Ivaylo Kenov Valio',
    'Emergency Mariq Mircheva Simo',
    'Cardiology Genka Shikerova Simon',
    'Emergency Ivaylo Kenov NuPogodi',
    'Cardiology Gosho Goshov Esmeralda',
    'Oncology Gosho Goshov Cleopatra',
    'Output',
    'Cardiology',
    'End',
];

// Execute the input processing and command execution
processInput(inputData);
