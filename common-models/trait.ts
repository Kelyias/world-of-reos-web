import {Species} from "./species";
import {Rarity} from "./rarity";
import {TraitType} from "./trait-type";

export class Trait {
    name: string;
    type: TraitType;
    rarity: Rarity;
    species: Species;
}

export const TRAITS: Trait[] = [
    //VAYRON EARS
    {name: 'Long', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.COMMON},
    {name: 'Vulpes', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.COMMON},
    {name: 'Bear', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.COMMON},

    {name: 'Sonar', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.UNCOMMON},
    {name: 'Fluffed', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.UNCOMMON},
    {name: 'Silken', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.UNCOMMON},
    {name: 'Loopy', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.UNCOMMON},
    {name: 'Draco', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.UNCOMMON},

    {name: 'Long Loopy', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.RARE},
    {name: 'Rodent', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.RARE},
    {name: 'Clipped', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.RARE},
    {name: 'Large Draco', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.RARE},
    {name: 'Dumbo', species: Species.VAYRON, type: TraitType.EAR, rarity: Rarity.RARE},

    //VAYRON TAILS
    {name: 'Bob Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.COMMON},
    {name: 'Stump Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.COMMON},
    {name: 'Medium Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.COMMON},
    {name: 'Short Tuft Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.COMMON},
    {name: 'Fox Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.COMMON},

    {name: 'Brush Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.UNCOMMON},
    {name: 'Puff Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.UNCOMMON},
    {name: 'Feline Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.UNCOMMON},
    {name: 'Tailless', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.UNCOMMON},

    {name: 'Large Puff Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.RARE},
    {name: 'Equine Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.RARE},
    {name: 'Long Tuft Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.RARE},
    {name: 'Base Brush Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.RARE},
    {name: 'Reptile Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.RARE},

    {name: 'Papillon Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.VERY_RARE},
    {name: 'Double Tuft Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.VERY_RARE},
    {name: 'Kitsune Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.VERY_RARE},
    {name: 'Spade Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.VERY_RARE},
    {name: 'Whip Tail', species: Species.VAYRON, type: TraitType.TAIL, rarity: Rarity.VERY_RARE},

    //VAYRON EYES
    {name: 'Round', species: Species.VAYRON, type: TraitType.EYE, rarity: Rarity.COMMON},
    {name: 'Feline', species: Species.VAYRON, type: TraitType.EYE, rarity: Rarity.COMMON},

    {name: 'Goat', species: Species.VAYRON, type: TraitType.EYE, rarity: Rarity.UNCOMMON},
    {name: 'Pupilless', species: Species.VAYRON, type: TraitType.EYE, rarity: Rarity.UNCOMMON},

    {name: 'Shaped', species: Species.VAYRON, type: TraitType.EYE, rarity: Rarity.RARE},
    {name: 'Glowing', species: Species.VAYRON, type: TraitType.EYE, rarity: Rarity.RARE},

    //TYRIAN EARS
    {name: 'Long', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.COMMON},
    {name: 'Vulpes', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.COMMON},
    {name: 'Bear', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.COMMON},
    {name: 'Peep', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.COMMON},

    {name: 'Sonar', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.UNCOMMON},
    {name: 'Fluffed', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.UNCOMMON},
    {name: 'Silken', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.UNCOMMON},
    {name: 'Loopy', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.UNCOMMON},
    {name: 'Draco', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.UNCOMMON},
    {name: 'Feathered', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.UNCOMMON},

    {name: 'Long Loopy', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.RARE},
    {name: 'Rodent', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.RARE},
    {name: 'Clipped', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.RARE},
    {name: 'Large Draco', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.RARE},
    {name: 'Dumbo', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.RARE},
    {name: 'Antennae', species: Species.TYRIAN, type: TraitType.EAR, rarity: Rarity.RARE},


    //TYRIAN TAILS
    {name: 'Tuft Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.COMMON},
    {name: 'Spear Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.COMMON},
    {name: 'Flap Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.COMMON},

    {name: 'Ribbed Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.UNCOMMON},
    {name: 'Ridged Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.UNCOMMON},
    {name: 'Quill Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.UNCOMMON},

    {name: 'Persian Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.RARE},
    {name: 'Frilled Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.RARE},
    {name: 'Veil Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.RARE},

    {name: 'Flat Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.VERY_RARE},
    {name: 'Bulb Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.VERY_RARE},
    {name: 'Cape Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.VERY_RARE},
    {name: 'Sprout Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.VERY_RARE},
    {name: 'Club Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.VERY_RARE},
    {name: 'Scorpion Tail', species: Species.TYRIAN, type: TraitType.TAIL, rarity: Rarity.VERY_RARE},


    //TYRIAN EYES
    {name: 'Round', species: Species.TYRIAN, type: TraitType.EYE, rarity: Rarity.COMMON},
    {name: 'Feline', species: Species.TYRIAN, type: TraitType.EYE, rarity: Rarity.COMMON},

    {name: 'Goat', species: Species.TYRIAN, type: TraitType.EYE, rarity: Rarity.UNCOMMON},
    {name: 'Pupilless', species: Species.TYRIAN, type: TraitType.EYE, rarity: Rarity.UNCOMMON},

    {name: 'Shaped', species: Species.TYRIAN, type: TraitType.EYE, rarity: Rarity.RARE},
    {name: 'Glowing', species: Species.TYRIAN, type: TraitType.EYE, rarity: Rarity.RARE},


]
