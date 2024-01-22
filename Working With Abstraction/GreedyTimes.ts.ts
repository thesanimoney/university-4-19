// Define an interface for the items in the safe
interface Item {
    type: string;
    name: string;
    quantity: number;
}

// Function to process the safe content and print the result
function processSafeContent(capacity: number, content: string): void {
    // Initialize a bag to store the quantity of each item type
    const bag: { [key: string]: number } = {};
    // Initialize an array to store the items in the safe
    const items: Item[] = [];

    // Split the content into lines
    const lines = content.split('\n');
    // Parse the bag capacity from the first line
    const bagCapacity = parseInt(lines[0]);

    // Validate the bag capacity
    if (isNaN(bagCapacity) || bagCapacity <= 0) {
        console.log('Invalid bag capacity');
        return;
    }

    // Split the item-quantity pairs from the second line
    const itemPairs = lines[1].split(' ');

    // Iterate through the item-quantity pairs
    for (let i = 0; i < itemPairs.length; i += 2) {
        // Extract the name and quantity of the item
        const name = itemPairs[i];
        const quantity = parseInt(itemPairs[i + 1]);

        // Validate the item name and quantity
        if (!name || isNaN(quantity) || quantity <= 0) {
            console.log('Invalid item quantity or name');
            return;
        }

        // Determine the type of the item
        const type = getItemType(name);

        // Skip items that do not fall into the specified categories
        if (!type) {
            continue;
        }

        // Initialize the quantity for the item type if not already present
        if (bag[type] === undefined) {
            bag[type] = 0;
        }

        // Update the quantity for the item type
        bag[type] += quantity;
        // Store the item in the items array
        items.push({ type, name, quantity });
    }

    // Sort the items based on specified criteria
    items.sort((a, b) => {
        if (a.type !== b.type) {
            return bag[b.type] - bag[a.type];
        } else {
            if (a.name !== b.name) {
                return b.name.localeCompare(a.name);
            } else {
                return a.quantity - b.quantity;
            }
        }
    });

    // Iterate through item types in descending order of total amount
    for (const itemType of Object.keys(bag).sort((a, b) => bag[b] - bag[a])) {
        // Print the total amount for the item type
        const totalAmount = bag[itemType];
        console.log(`<${itemType}> $${totalAmount}`);

        // Iterate through items of the current type
        for (const item of items.filter((i) => i.type === itemType)) {
            // Print each item's details
            console.log(`##${item.name} - ${item.quantity}`);
        }
    }
}

// Function to determine the type of an item based on its name
function getItemType(name: string): string | null {
    // Define a regular expression to match valid item types
    const itemTypeRegex = /^(...|.*Gem|Gold)$/i;
    // Use the regular expression to match the item type in a case-insensitive manner
    const match = name.match(itemTypeRegex);

    // Return the matched item type or null if no match
    return match ? match[0] : null;
}

// Example usage
const bagCapacity = 150;
const safeContent = 'Gold 28 Rubygem 16 USD 9 GBP 8';

// Call the function to process the safe content
processSafeContent(bagCapacity, safeContent);
