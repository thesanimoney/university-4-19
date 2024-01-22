import * as fs from 'fs';

function copyBinaryFile(sourcePath: string, destinationPath: string): void {
    // Create read and write streams using FileStream
// Create a read stream using FileStream with a 1 KB buffer size
    const readStream = fs.createReadStream(sourcePath, { highWaterMark: 1024 });
// Create a write stream using FileStream for the destination file
    const writeStream = fs.createWriteStream(destinationPath);


    // Handle data events to read and write chunks
    readStream.on('data', (chunk) => {
        // Write the chunk to the destination file
        writeStream.write(chunk);
    });

    // Handle end event to close the write stream
    readStream.on('end', () => {
        writeStream.end();
        console.log('File copy completed.');
    });

    // Handle errors during the copying process
    readStream.on('error', (error) => {
        console.error(`Error reading file: ${error.message}`);
    });

    writeStream.on('error', (error) => {
        console.error(`Error writing file: ${error.message}`);
    });
}

// Replace 'copyMe.png' and 'copyMecopy.png' with the actual paths to your files
const sourceFilePath: string = 'copyMe.png';
const destinationFilePath: string = 'copyMecopy.png';

// Copy the binary file
copyBinaryFile(sourceFilePath, destinationFilePath);
