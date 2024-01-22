// Enum representing possible traffic light signals
enum TrafficLightSignal {
    Red = 'Red',
    Green = 'Green',
    Yellow = 'Yellow',
}

// Class representing a Traffic Light
class TrafficLight {
    private currentSignal: TrafficLightSignal;

    // Constructor to initialize the traffic light with an initial signal
    constructor(initialSignal: TrafficLightSignal) {
        this.currentSignal = initialSignal;
    }

    // Method to update the traffic light signal based on the current state
    updateSignal(): void {
        switch (this.currentSignal) {
            case TrafficLightSignal.Red:
                this.currentSignal = TrafficLightSignal.Green;
                break;
            case TrafficLightSignal.Green:
                this.currentSignal = TrafficLightSignal.Yellow;
                break;
            case TrafficLightSignal.Yellow:
                this.currentSignal = TrafficLightSignal.Red;
                break;
        }
    }

    // Method to get the current signal of the traffic light
    getSignal(): TrafficLightSignal {
        return this.currentSignal;
    }
}

// Function to update a sequence of traffic lights for a specified number of times
function updateTrafficLightSequence(signals: TrafficLightSignal[], times: number): TrafficLightSignal[] {
    // Create an array of TrafficLight instances based on the provided signals
    const trafficLights: TrafficLight[] = signals.map((signal) => new TrafficLight(signal));
    const result: TrafficLightSignal[] = [];

    // Iterate through the specified number of times
    for (let i = 0; i < times; i++) {
        // Update each traffic light and collect the updated signals
        const updatedSignals = trafficLights.map((light) => {
            light.updateSignal();
            return light.getSignal();
        });

        // Append the updated signals to the result
        result.push(...updatedSignals);
    }

    // Return the final sequence of traffic light signals
    return result;
}

// Example Input
const inputSignals: TrafficLightSignal[] = [TrafficLightSignal.Green, TrafficLightSignal.Red, TrafficLightSignal.Yellow];
const updateTimes: number = 4;

// Output
const outputSignals: TrafficLightSignal[] = updateTrafficLightSequence(inputSignals, updateTimes);

// Log the final sequence to the console
console.log(outputSignals.join('\n'));
