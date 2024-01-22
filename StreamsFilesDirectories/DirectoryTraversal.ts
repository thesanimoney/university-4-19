// Import the 'fs' (File System) and 'path' modules
import * as fs from 'fs';
import * as path from 'path';

// Define a function to traverse a directory for files with a specific extension
function traverseDirectory(directoryPath: string, extension: string): void {
    // Get the path to the user's Desktop
    const desktopPath = path.join(require('os').homedir(), 'Desktop');
    // Define the path for the report file on the Desktop
    const reportPath = path.join(desktopPath, 'report.txt');

    try {
        // Create an object to store files grouped by extension
        const filesByExtension: Record<string, { name: string; size: number }[]> = {};

        // Read files in the given directory
        const files = fs.readdirSync(directoryPath);

        // Filter files by extension
        const filteredFiles = files.filter(file => path.extname(file) === `.${extension}`);

        // Sort files by size in descending order
        const sortedFiles = filteredFiles.sort((a, b) => {
            const sizeA = fs.statSync(path.join(directoryPath, a)).size;
            const sizeB = fs.statSync(path.join(directoryPath, b)).size;

            return sizeB - sizeA;
        });

        // Group files by extension
        sortedFiles.forEach(file => {
            const fileExtension = path.extname(file);

            if (!filesByExtension[fileExtension]) {
                filesByExtension[fileExtension] = [];
            }

            const filePath = path.join(directoryPath, file);
            const fileSize = fs.statSync(filePath).size;

            filesByExtension[fileExtension].push({ name: file, size: fileSize });
        });

        // Sort extensions by count and name
        const sortedExtensions = Object.keys(filesByExtension).sort((a, b) => {
            const countA = filesByExtension[a].length;
            const countB = filesByExtension[b].length;

            if (countA !== countB) {
                return countB - countA; // Sort by count descending
            }

            return a.localeCompare(b); // Sort by name alphabetically
        });

        // Write to report.txt
        const reportStream = fs.createWriteStream(reportPath);

        sortedExtensions.forEach(extension => {
            reportStream.write(`.${extension}\n`);

            const filesInExtension = filesByExtension[extension];

            filesInExtension.forEach(file => {
                reportStream.write(`--- ${file.name} - ${file.size}kb\n`);
            });
        });

        console.log('Report generated successfully.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example: Traverse the "example_directory" for files with the ".txt" extension
traverseDirectory('example_directory', 'txt');
