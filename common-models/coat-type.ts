import {Rarity} from "./rarity";

export class CoatType {
    name:string;
    rarity:Rarity
}

export const COAT_TYPES:CoatType[]=[
    {name:'lisse',rarity:Rarity.COMMON},
    {name:'friese',rarity:Rarity.UNCOMMON},
    {name:'duveteux',rarity:Rarity.RARE},
    {name:'angora',rarity:Rarity.VERY_RARE},
];
