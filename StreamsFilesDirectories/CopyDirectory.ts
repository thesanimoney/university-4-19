import * as fs from 'fs-extra';

function copyDirectory(inputPath: string, outputPath: string): void {
    // Check if the output folder exists
    const outputFolderExists = fs.existsSync(outputPath);

    // If the output folder exists, delete it and its contents
    if (outputFolderExists) {
        fs.removeSync(outputPath);
        console.log(`Deleted existing output folder: ${outputPath}`);
    }

    // Copy the entire directory to the new location
    fs.copySync(inputPath, outputPath);

    console.log(`Successfully copied directory from ${inputPath} to ${outputPath}`);
}

// Read input and output folder paths from the console
const inputPath = process.argv[2]; // Input folder path
const outputPath = process.argv[3]; // Output folder path

// Check if input and output paths are provided
if (inputPath && outputPath) {
    // Call the copyDirectory function
    copyDirectory(inputPath, outputPath);
} else {
    console.error('Please provide input and output folder paths.');
}
