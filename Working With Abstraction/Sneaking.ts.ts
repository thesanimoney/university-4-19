class Room {
    private grid: string[][]; // 2D array to represent the room layout
    private samPosition: { row: number; col: number }; // Sam's current position
    private nikoladzePosition: { row: number; col: number }; // Nikoladze's position

    // Constructor to initialize the room with the given layout
    constructor(rows: number, layout: string[]) {
        this.grid = layout.map((row) => row.split('')); // Convert layout to a 2D array
        this.findInitialPositions(); // Find initial positions of Sam and Nikoladze
    }

    // Method to find the initial positions of Sam and Nikoladze
    private findInitialPositions() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                const cell = this.grid[row][col];
                if (cell === 'S') {
                    this.samPosition = { row, col };
                } else if (cell === 'N') {
                    this.nikoladzePosition = { row, col };
                }
            }
        }
    }

    // Method to move enemies in the room based on their direction
    private moveEnemies() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                const cell = this.grid[row][col];
                if (cell === 'b') {
                    this.moveEnemy(row, col, 1); // Move right
                } else if (cell === 'd') {
                    this.moveEnemy(row, col, -1); // Move left
                }
            }
        }
    }

    // Method to move a specific enemy in the given direction
    private moveEnemy(row: number, col: number, direction: number) {
        const newCol = col + direction;
        if (newCol < 0 || newCol >= this.grid[row].length) {
            // Enemy reaches the edge, flip direction
            this.grid[row][col] = direction === 1 ? 'd' : 'b';
        } else {
            this.grid[row][col] = '.'; // Clear current position
            this.grid[row][newCol] = direction === 1 ? 'b' : 'd'; // Move to the new position
        }
    }

    // Method to move Sam in the specified direction
    private moveSam(direction: string) {
        const { row, col } = this.samPosition;
        this.grid[row][col] = '.'; // Clear current position

        switch (direction) {
            case 'U':
                this.samPosition.row--;
                break;
            case 'D':
                this.samPosition.row++;
                break;
            case 'L':
                this.samPosition.col--;
                break;
            case 'R':
                this.samPosition.col++;
                break;
        }

        this.grid[this.samPosition.row][this.samPosition.col] = 'S'; // Update the new position
    }

    // Method to check the outcome after each move
    private checkOutcome() {
        const { row, col } = this.samPosition;
        const samCell = this.grid[row][col];

        if (samCell === 'N') {
            this.grid[row][col] = 'X'; // Nikoladze killed
            return 'Nikoladze killed!';
        }

        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[row][i] === 'b' || this.grid[row][i] === 'd') {
                this.grid[row][col] = 'X'; // Sam killed
                return `Sam died at ${row + 1}, ${col + 1}`;
            }
        }

        return null; // No outcome yet
    }

    // Method to play the game with a sequence of moves
    public playGame(moves: string[]) {
        for (const move of moves) {
            this.moveEnemies(); // Move enemies first
            this.moveSam(move); // Then move Sam

            const outcome = this.checkOutcome(); // Check the outcome after the move
            if (outcome) {
                console.log(outcome);
                this.printRoom(); // Print the final state of the room
                return;
            }
        }
    }

    // Method to print the final state of the room
    private printRoom() {
        for (const row of this.grid) {
            console.log(row.join(''));
        }
    }
}

// Example usage:
const inputRows = 5;
const inputLayout = [
    '......N...',
    'b.........',
    '..d.......',
    '......d...',
    '.....S....',
];
const moves = ['R', 'R', 'R', 'U', 'U'];

const room = new Room(inputRows, inputLayout);
room.playGame(moves);
