class EntryControl {
    private detainedIds: string[] = [];

    /**
     * Processes the input lines to determine detained IDs.
     * @param inputLines - Array of input lines.
     */
    processInput(inputLines: string[]): void {
        // Iterate through each input line
        for (const line of inputLines) {
            // Check if the end command is received
            if (line === 'End') {
                break;
            }

            // Split the line into tokens (name, age, model, id)
            const tokens = line.split(' ');
            const lastDigitsToCheck = Number(tokens[tokens.length - 1]);

            // Check if the entry ID should be detained
            this.checkEntry(tokens.slice(0, -1), lastDigitsToCheck);
        }

        // Print detained IDs
        this.printDetainedIds();
    }

    /**
     * Checks if the entry ID should be detained based on the specified last digits.
     * @param entryInfo - Array of entry information (name, age, and/or model).
     * @param lastDigitsToCheck - Last digits to check for detention.
     */
    private checkEntry(entryInfo: string[], lastDigitsToCheck: number): void {
        // Combine entry information into a single string (entry ID)
        const entryId = entryInfo.join(' ');

        // Check if the entry ID ends with the specified last digits
        if (entryId.endsWith(lastDigitsToCheck.toString())) {
            // Add the detained ID to the list
            this.detainedIds.push(entryId);
        }
    }

    /**
     * Prints the detained IDs to the console.
     */
    private printDetainedIds(): void {
        // Iterate through detained IDs and print each one
        for (const detainedId of this.detainedIds) {
            console.log(detainedId);
        }
    }
}

// Example usage
const entryControl = new EntryControl();
const input = [
    'Pesho 22 9010101122',
    'MK-13 558833251',
    'MK-12 33283122',
    'End',
    '122'
];

// Process the input and print detained IDs
entryControl.processInput(input);
