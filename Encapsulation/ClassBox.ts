class Box {
    private _length: number;
    private _width: number;
    private _height: number;

    constructor(length: number, width: number, height: number) {
        // Use the private setters to perform data validation
        this.setLength(length);
        this.setWidth(width);
        this.setHeight(height);
    }

    // Private setter for length with data validation
    private setLength(value: number): void {
        if (value <= 0) {
            throw new Error('Length must be greater than zero.');
        }
        this._length = value;
    }

    // Private setter for width with data validation
    private setWidth(value: number): void {
        if (value <= 0) {
            throw new Error('Width must be greater than zero.');
        }
        this._width = value;
    }

    // Private setter for height with data validation
    private setHeight(value: number): void {
        if (value <= 0) {
            throw new Error('Height must be greater than zero.');
        }
        this._height = value;
    }

    // Getter methods for length, width, and height
    get length(): number {
        return this._length;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    // Method to calculate and return the surface area of the box
    getSurfaceArea(): number {
        return 2 * (this._length * this._width + this._length * this._height + this._width * this._height);
    }

    // Method to calculate and return the lateral surface area of the box
    getLateralSurfaceArea(): number {
        return 2 * (this._length * this._height + this._width * this._height);
    }

    // Method to calculate and return the volume of the box
    getVolume(): number {
        return this._length * this._width * this._height;
    }
}

// Example usage
try {
    const box = new Box(2, 3, 4);
    console.log(`Surface Area - ${box.getSurfaceArea().toFixed(2)}`);
    console.log(`Lateral Surface Area - ${box.getLateralSurfaceArea().toFixed(2)}`);
    console.log(`Volume - ${box.getVolume().toFixed(2)}`);
} catch (error) {
    console.error(error.message);
}
