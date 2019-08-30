export class Supplement {
    name: string;
    effect: string;
    rule: SupplementRule;
    target?: any;
}

export enum SupplementRule {
    ALL_MALE,
    ALL_FEMALE,
    MIN_PUPS_UP,
    TARGET_COAT_COLOUR,
    TARGET_BODY_TYPE,
    TARGET_GLINT

}

export const SUPPLEMENTS: Supplement[] = [
    {
        name: 'Chromatic Concoction',
        effect: 'Garauntees the litter is all the chosen base color',
        rule: SupplementRule.TARGET_COAT_COLOUR
    },
    {
        name: 'Physique Petites',
        effect: 'Garauntees a certain body type (within what the parents can make)',
        rule: SupplementRule.TARGET_BODY_TYPE
    },
    {
        name: 'Glint Potion',
        effect: 'Specified Glint color (if glint is rolled on the pup. If glint doesn’t pass onto any of the pups, the Glint Potion wasn’t consumed/can be reused on another breeding later)',
        rule: SupplementRule.TARGET_GLINT
    },
    {
        name: 'Spirit Of The Sun',
        effect: 'Litter all male',
        rule: SupplementRule.ALL_MALE
    },
    {
        name: 'Grace Of The Moons',
        effect: 'Litter all female',
        rule: SupplementRule.ALL_FEMALE
    },
    {
        name: 'Twinscuit',
        effect: 'Minimum 2 pups',
        rule: SupplementRule.MIN_PUPS_UP
    },
];
