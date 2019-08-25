import {Marking} from "./marking";
import {Rarity} from "./rarity";

export class Modifier extends Marking{

}

export const MARKING_MODIFIERS:Modifier[]=[
    {phenotype:'glint',recessiveSymbol:'Gl',dominateSymbol:'GG',rarity:Rarity.SPECIAL}
]
