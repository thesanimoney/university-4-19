// Abstract class for Food
abstract class Food {
    abstract getHappinessPoints(): number;
}

// Concrete classes for each type of food
class Cram extends Food {
    getHappinessPoints(): number {
        return 2;
    }
}

class Lembas extends Food {
    getHappinessPoints(): number {
        return 3;
    }
}

class Apple extends Food {
    getHappinessPoints(): number {
        return 1;
    }
}

class Melon extends Food {
    getHappinessPoints(): number {
        return 1;
    }
}

class HoneyCake extends Food {
    getHappinessPoints(): number {
        return 5;
    }
}-+
    class Mushrooms extends Food {
    getHappinessPoints(): number {
        return -10;
    }
}

// Factory class for creating Food objects
class FoodFactory {
    createFood(type: string): Food {
        switch (type.toLowerCase()) {
            case 'cram':
                return new Cram();
            case 'lembas':
                return new Lembas();
            case 'apple':
                return new Apple();
            case 'melon':
                return new Melon();
            case 'honeycake':
                return new HoneyCake();
            case 'mushrooms':
                return new Mushrooms();
            default:
                throw new Error('Invalid food type');
        }
    }
}

// Abstract class for Mood
abstract class Mood {
    abstract getMoodName(): string;
}

// Concrete classes for each type of mood
class Angry extends Mood {
    getMoodName(): string {
        return 'Angry';
    }
}

class Sad extends Mood {
    getMoodName(): string {
        return 'Sad';
    }
}

class Happy extends Mood {
    getMoodName(): string {
        return 'Happy';
    }
}

class JavaScript extends Mood {
    getMoodName(): string {
        return 'JavaScript';
    }
}

// Factory class for creating Mood objects
class MoodFactory {
    createMood(points: number): Mood {
        if (points < -5) {
            return new Angry();
        } else if (points <= 0) {
            return new Sad();
        } else if (points <= 15) {
            return new Happy();
        } else {
            return new JavaScript();
        }
    }
}

// Function to calculate Gandalf's happiness
function calculateHappiness(foods: string[]): [number, string] {
    const foodFactory = new FoodFactory();
    const moodFactory = new MoodFactory();

    let happinessPoints = 0;

    // Iterate through each food in the provided array
    for (const food of foods) {
        // Create an instance of the respective food type
        const currentFood = foodFactory.createFood(food);
        // Add its happiness points to the total
        happinessPoints += currentFood.getHappinessPoints();
    }

    // Create an instance of the respective mood based on happiness points
    const mood = moodFactory.createMood(happinessPoints);

    // Return a tuple containing happiness points and the mood's name
    return [happinessPoints, mood.getMoodName()];
}

// Test
const input = 'Cram melon honeyCake Cake';
const foods = input.split(' ');

// Calculate Gandalf's happiness and mood
const [happinessPoints, mood] = calculateHappiness(foods);

// Print results to the console
console.log('Happiness Points:', happinessPoints);
console.log('Mood:', mood);
