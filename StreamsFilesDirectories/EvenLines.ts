import * as fs from 'fs';

function processLine(line: string): string {
    // Replace specified characters with '@'
    let replacedLine: string = line.replace(/[-,.!?\s]/g, '@');

    // Reverse the order of the words
    let words: string[] = replacedLine.split(' ').reverse();

    // Join the reversed words to form the processed line
    let processedLine: string = words.join(' ');

    return processedLine;
}

function processFile(fileName: string): void {
    try {
        const data: string = fs.readFileSync(fileName, 'utf8');
        const lines: string[] = data.split('\n');

        // Process even lines
        for (let i = 0; i < lines.length; i += 2) {
            const processedLine: string = processLine(lines[i]);
            console.log(processedLine);
        }
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}

// Replace 'text.txt' with the actual path to your text file
const fileName: string = 'text.txt';
processFile(fileName);
