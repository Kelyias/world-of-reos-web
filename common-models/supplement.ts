export class Supplement {
    name:string;
    effect:string;
}

export const SUPPLEMENTS:Supplement[]=[
    {
        name:'Spirit Of The Sun',
        effect:'Litter all male'
    },
    {
        name:'Grace Of The Moons',
        effect:'Litter all female'
    },
    {
        name:'Twinscuit',
        effect:'Minimum 2 pups'
    },
    {
        name:'Chromatic Concoction',
        effect:'Garauntees the litter is all the chosen base color'
    },
    {
        name:'Physique Petites',
        effect:'Garauntees a certain body type (within what the parents can make)'
    },
    {
        name:'Glint Potion',
        effect:'Specified Glint color (if glint is rolled on the pup. If glint doesn’t pass onto any of the pups, the Glint Potion wasn’t consumed/can be reused on another breeding later)'
    }
];
