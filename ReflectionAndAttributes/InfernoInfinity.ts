class Weapon {
    private static readonly baseStats: Record<string, [number, number, number]> = {
        Axe: [5, 10, 4],
        Sword: [4, 6, 3],
        Knife: [3, 4, 2],
    };

    private static readonly rarityModifiers: Record<string, number> = {
        Common: 1,
        Uncommon: 2,
        Rare: 3,
        Epic: 5,
    };

    private static readonly gemStats: Record<string, [number, number, number]> = {
        Ruby: [7, 2, 5],
        Emerald: [1, 4, 9],
        Amethyst: [2, 8, 4],
    };

    private static readonly clarityModifiers: Record<string, number> = {
        Chipped: 1,
        Regular: 2,
        Perfect: 5,
        Flawless: 10,
    };

    private name: string;
    private type: string;
    private rarity: string;
    private gems: { type: string; clarity: string }[] = [];

    constructor(type: string, name: string, rarity: string) {
        this.type = type;
        this.name = name;
        this.rarity = rarity;
    }

    private calculateBaseStats(): [number, number, number] {
        // Calculate base stats based on weapon type and rarity
        const [minDamage, maxDamage, sockets] = Weapon.baseStats[this.type];
        const rarityModifier = Weapon.rarityModifiers[this.rarity];
        return [minDamage * rarityModifier, maxDamage * rarityModifier, sockets];
    }

    private calculateGemStats(): [number, number, number] {
        // Calculate gem stats based on type and clarity
        let totalStrength = 0;
        let totalAgility = 0;
        let totalVitality = 0;

        for (const gem of this.gems) {
            const [gemStrength, gemAgility, gemVitality] = Weapon.gemStats[gem.type];
            const clarityModifier = Weapon.clarityModifiers[gem.clarity];
            totalStrength += gemStrength * clarityModifier;
            totalAgility += gemAgility * clarityModifier;
            totalVitality += gemVitality * clarityModifier;
        }

        return [totalStrength, totalAgility, totalVitality];
    }

    private calculateFinalStats(): string {
        // Calculate final stats by combining base stats and gem stats
        const [baseMinDamage, baseMaxDamage, sockets] = this.calculateBaseStats();
        const [gemStrength, gemAgility, gemVitality] = this.calculateGemStats();

        const minDamage = baseMinDamage + 2 * gemStrength + gemAgility;
        const maxDamage = baseMaxDamage + 3 * gemStrength + 4 * gemAgility;

        return `${this.name}: ${minDamage}-${maxDamage} Damage, +${gemStrength} Strength, +${gemAgility} Agility, +${gemVitality} Vitality`;
    }

    public addGem(socketIndex: number, gemType: string, clarity: string): void {
        // Add a gem to the specified socket index
        if (socketIndex >= 0 && socketIndex < this.calculateBaseStats()[2]) {
            this.gems[socketIndex] = { type: gemType, clarity: clarity };
        }
    }

    public removeGem(socketIndex: number): void {
        // Remove a gem from the specified socket index
        if (socketIndex >= 0 && socketIndex < this.calculateBaseStats()[2]) {
            delete this.gems[socketIndex];
        }
    }

    public printStats(): string {
        // Print the final stats for the weapon
        return this.calculateFinalStats();
    }
}

class CraftingModule {
    private weapons: Record<string, Weapon> = {};

    private createWeapon(weaponType: string, weaponName: string, rarity: string): void {
        // Create a new weapon and store it in the collection
        this.weapons[weaponName] = new Weapon(weaponType, weaponName, rarity);
    }

    private addGem(weaponName: string, socketIndex: number, gemType: string, clarity: string): void {
        // Add a gem to a specific weapon's socket index
        const weapon = this.weapons[weaponName];
        if (weapon) {
            weapon.addGem(socketIndex, gemType, clarity);
        }
    }

    private removeGem(weaponName: string, socketIndex: number): void {
        // Remove a gem from a specific weapon's socket index
        const weapon = this.weapons[weaponName];
        if (weapon) {
            weapon.removeGem(socketIndex);
        }
    }

    private printStats(weaponName: string): string {
        // Print the final stats for a specific weapon
        const weapon = this.weapons[weaponName];
        return weapon ? weapon.printStats() : '';
    }

    public processCommands(commands: string[]): string[] {
        // Process the input commands and return the final output
        const output: string[] = [];

        for (const command of commands) {
            const [action, ...params] = command.split(';');

            switch (action) {
                case 'Create':
                    const [weaponType, weaponName, rarity] = params;
                    this.createWeapon(weaponType, weaponName, rarity);
                    break;

                case 'Add':
                    const [addWeaponName, addSocketIndex, addGemType, addClarity] = params;
                    this.addGem(addWeaponName, +addSocketIndex, addGemType, addClarity);
                    break;

                case 'Remove':
                    const [removeWeaponName, removeSocketIndex] = params;
                    this.removeGem(removeWeaponName, +removeSocketIndex);
                    break;

                case 'Print':
                    const printWeaponName = params[0];
                    const stats = this.printStats(printWeaponName);
                    if (stats) {
                        output.push(stats);
                    }
                    break;
            }
        }

        return output;
    }
}

// Example input
const inputCommands: string[] = [
    'Create;Common Axe;Axe of Misfortune',
    'Add;Axe of Misfortune;0;Chipped Ruby',
    'Print;Axe of Misfortune',
];

// Instantiate the crafting module and process commands
const craftingModule = new CraftingModule();
const output = craftingModule.processCommands(inputCommands);

// Log the output
console.log(output.join('\n'));
