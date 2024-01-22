class HarvestingFields {
    private testInt: number;
    public testDouble: number;
    protected testString: string;
    private testLong: number;
    protected aDouble: number;
    public aString: string;
    private aCalendar: Intl.DateTimeFormat['calendar'];
    public aBuilder: StringBuilder;
    private testChar: string;
    public testShort: number;
    protected testByte: number;
    public aByte: number;
    protected aBuffer: StringBuilder;
    private testBigInt: bigint;
    protected testBigNumber: bigint;
    protected testFloat: number;
    public aFloat: number;
    private aThread: Thread;
    public testThread: Thread;
    private aPredicate: any;
    protected testPredicate: any;
    public anObject: any;
    private hiddenObject: any;
    protected fatherMotherObject: any;
    private anotherString: string;
    protected moarString: string;
    public anotherIntBitesTheDust: number;
    private internalException: Error;
    protected inheritableException: Error;
    public justException: Error;
    public aStream: NodeJS.ReadableStream;
    protected moarStreamz: NodeJS.ReadableStream;
    private secretStream: NodeJS.ReadableStream;
}

/**
 * HarvestingFieldsPrinter is responsible for printing fields of the HarvestingFields class based on access modifier.
 */
class HarvestingFieldsPrinter {
    private harvestingFields: HarvestingFields;

    /**
     * Initializes a new instance of the HarvestingFieldsPrinter class.
     * @param {HarvestingFields} harvestingFields - The instance of the HarvestingFields class.
     */
    constructor(harvestingFields: HarvestingFields) {
        this.harvestingFields = harvestingFields;
    }

    /**
     * Prints fields based on the given access modifier.
     * @param {string} accessModifier - The access modifier ('private', 'protected', 'public', or 'all').
     */
    printFields(accessModifier: string): void {
        // Get all field names of the HarvestingFields class
        const fields = Object.getOwnPropertyNames(HarvestingFields.prototype) as (keyof HarvestingFields)[];

        // Filter fields based on the provided access modifier
        const filteredFields = fields.filter((fieldName) => {
            const field = this.harvestingFields[fieldName];
            return (
                (accessModifier === 'private' && fieldName.startsWith('test')) ||
                (accessModifier === 'protected' && fieldName.startsWith('test')) ||
                (accessModifier === 'public' && !fieldName.startsWith('test')) ||
                accessModifier === 'all'
            );
        });

        // Print the filtered fields
        filteredFields.forEach((fieldName) => {
            const fieldType = typeof this.harvestingFields[fieldName];
            console.log(`${accessModifier} ${fieldType} ${fieldName}`);
        });
    }
}

// Read input commands until HARVEST is encountered
const inputCommands: string[] = ['private', 'protected', 'public', 'all', 'HARVEST'];

const harvestingFields = new HarvestingFields();
const harvestingFieldsPrinter = new HarvestingFieldsPrinter(harvestingFields);

for (const command of inputCommands) {
    if (command === 'HARVEST') {
        break;
    }
    harvestingFieldsPrinter.printFields(command);
}
