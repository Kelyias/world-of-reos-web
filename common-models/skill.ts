import {Rarity} from "./rarity";

export class Skill {
    name: string;
    description: string;
    rarity: Rarity;
}

export const SKILLS: Skill[] = [
    {
        name: 'Even Footing',
        description: '15% bonus questing success rate',
        rarity: Rarity.COMMON,
    },
    {
        name: 'Forager',
        description: 'Gives 1 additional item upon failing a quest',
        rarity: Rarity.COMMON,
    },
    {
        name: 'Scavenger',
        description: 'Gives 1 additional item upon failing a hunt',
        rarity: Rarity.COMMON,
    },
    {
        name: 'Hawk\'s Eye',
        description: '15% bonus hunting success rate',
        rarity: Rarity.COMMON,
    },
    {
        name: 'Tenacious',
        description: 'Basic and Sturdy armor has a chance of withstanding a hit that would otherwise break it',
        rarity: Rarity.COMMON,
    },
    {
        name: 'Smithy',
        description: 'Reduces the chance of failing crafting within the Blacksmithing section by 20%',
        rarity: Rarity.UNCOMMON,
    },
    {
        name: 'Potion Master',
        description: 'Reduces the chance of failing crafting within the Alchemy section by 20%',
        rarity: Rarity.UNCOMMON,
    },
    {
        name: 'Crafty',
        description: 'Reduces the chance of failing crafting within the Miscellaneous section by 20%',
        rarity: Rarity.UNCOMMON,
    },
    {
        name: 'Chef',
        description: 'Reduces the chance of failing crafting within the Cooking section by 20%',
        rarity: Rarity.UNCOMMON,
    },
    {
        name: 'Final Stand',
        description: 'Guaranteed to hit an attack if HP is less than 15% of the total',
        rarity: Rarity.UNCOMMON,
    },
    {
        name: 'Party Animal',
        description: 'If drawn in a festive raffle type event entry, gives an additional raffle ticket on each entry image',
        rarity: Rarity.RARE,
    },
    {
        name: 'Hoarder',
        description: 'Allows for 2 additional familiars to be added on top of the maximum of 3.',
        rarity: Rarity.RARE,
    },
];
