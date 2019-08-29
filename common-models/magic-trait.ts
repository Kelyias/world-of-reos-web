import {Species} from "./species";

export class MagicTrait {
    name: string;
    species: Species;
}

export const MAGICAl_TRAITS: MagicTrait[] = [
    {name: 'cherub', species: Species.VAYRON},
    {name: 'bat wings', species: Species.VAYRON},
    {name: 'feathered', species: Species.VAYRON},
    {name: 'licorne', species: Species.VAYRON},
    {name: 'prophet', species: Species.VAYRON},
    {name: 'mistwalker', species: Species.VAYRON},
    {name: 'seraph', species: Species.VAYRON},
    {name: 'cherub', species: Species.TYRIAN},
    {name: 'bat wings', species: Species.TYRIAN},
    {name: 'feathered', species: Species.TYRIAN},
    {name: 'licorne', species: Species.TYRIAN},
    {name: 'prophet', species: Species.TYRIAN},
    {name: 'mistwalker', species: Species.TYRIAN},
    {name: 'seraph', species: Species.TYRIAN},
    {name: 'whiskers', species: Species.TYRIAN},
];
