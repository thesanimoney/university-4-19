import * as fs from 'fs';

// Class responsible for reading and writing files
class FileProcessor {
    // Method to read lines from a file
    static readLines(filePath: string): string[] {
        try {
            // Read file synchronously and split lines by newline character
            const data: string = fs.readFileSync(filePath, 'utf8');
            return data.split('\n');
        } catch (error) {
            console.error(`An error occurred while reading file: ${error.message}`);
            return [];
        }
    }

    // Method to write lines to a file
    static writeLines(filePath: string, lines: string[]): void {
        try {
            // Write lines to file synchronously
            fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
            console.log(`File written successfully: ${filePath}`);
        } catch (error) {
            console.error(`An error occurred while writing file: ${error.message}`);
        }
    }
}

// Function to process a text file, insert line numbers, and count letters and punctuation marks
function processTextFile(inputPath: string, outputPath: string): void {
    // Read lines from the input file
    const inputLines: string[] = FileProcessor.readLines(inputPath);
    const outputLines: string[] = [];

    // Iterate through each line in the input file
    for (let i = 0; i < inputLines.length; i++) {
        const line: string = inputLines[i];

        // Count letters and punctuation marks in the line
        const lettersCount: number = line.replace(/[^a-zA-Z]/g, '').length;
        const punctuationCount: number = line.replace(/[a-zA-Z\s]/g, '').length;

        // Format the output line
        const outputLine = `Line ${i + 1}: ${line} (${lettersCount})(${punctuationCount})`;
        outputLines.push(outputLine);
    }

    // Write the processed lines to the output file
    FileProcessor.writeLines(outputPath, outputLines);
}

// Replace 'text.txt' and 'output.txt' with the actual paths to your files
const inputFilePath: string = 'text.txt';
const outputFilePath: string = 'output.txt';

// Process the text file
processTextFile(inputFilePath, outputFilePath);
