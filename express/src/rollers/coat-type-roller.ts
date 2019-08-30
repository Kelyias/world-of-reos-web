import {Reosean} from "../../../common-models/reosean";
import {Rarity} from "../../../common-models/rarity";
import {SecureRandom} from "../security/secure-random";
import {COAT_TYPES} from "../../../common-models/coat-type";

export class CoatTypeRoller {

    private static coatTypePassRates: CoatTypePassRate[] = [
        //COMMON
        {
            raritySet: new Set<Rarity>().add(Rarity.COMMON).add(Rarity.COMMON),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 1}
            ]
        },
        {
            raritySet: new Set<Rarity>().add(Rarity.COMMON).add(Rarity.UNCOMMON),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.7},
                {rarity: Rarity.UNCOMMON, passRate: 0.3}]
        },
        {
            raritySet: new Set<Rarity>().add(Rarity.COMMON).add(Rarity.RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.7},
                {rarity: Rarity.UNCOMMON, passRate: 0.2},
                {rarity: Rarity.RARE, passRate: 0.1}]
        },
        {
            raritySet: new Set<Rarity>().add(Rarity.COMMON).add(Rarity.VERY_RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.7},
                {rarity: Rarity.UNCOMMON, passRate: 0.2},
                {rarity: Rarity.RARE, passRate: 0.09},
                {rarity: Rarity.VERY_RARE, passRate: 0.01}
            ]

        },
        //UNCOMMON
        {
            raritySet: new Set<Rarity>().add(Rarity.UNCOMMON).add(Rarity.UNCOMMON),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.65},
                {rarity: Rarity.UNCOMMON, passRate: 0.23},
                {rarity: Rarity.RARE, passRate: 0.11},
                {rarity: Rarity.VERY_RARE, passRate: 0.01}
            ]
        },
        {
            raritySet: new Set<Rarity>().add(Rarity.UNCOMMON).add(Rarity.RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.6},
                {rarity: Rarity.UNCOMMON, passRate: 0.25},
                {rarity: Rarity.RARE, passRate: 0.13},
                {rarity: Rarity.VERY_RARE, passRate: 0.02}
            ]
        },
        {
            raritySet: new Set<Rarity>().add(Rarity.UNCOMMON).add(Rarity.VERY_RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.55},
                {rarity: Rarity.UNCOMMON, passRate: 0.28},
                {rarity: Rarity.RARE, passRate: 0.15},
                {rarity: Rarity.VERY_RARE, passRate: 0.02}
            ]

        },
        //RARE
        {
            raritySet: new Set<Rarity>().add(Rarity.RARE).add(Rarity.RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.52},
                {rarity: Rarity.UNCOMMON, passRate: 0.29},
                {rarity: Rarity.RARE, passRate: 0.17},
                {rarity: Rarity.VERY_RARE, passRate: 0.02}
            ]
        },
        {
            raritySet: new Set<Rarity>().add(Rarity.RARE).add(Rarity.VERY_RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.5},
                {rarity: Rarity.UNCOMMON, passRate: 0.30},
                {rarity: Rarity.RARE, passRate: 0.18},
                {rarity: Rarity.VERY_RARE, passRate: 0.02}]

        },
        //VERY RARE
        {
            raritySet: new Set<Rarity>().add(Rarity.VERY_RARE).add(Rarity.VERY_RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.40},
                {rarity: Rarity.UNCOMMON, passRate: 0.35},
                {rarity: Rarity.RARE, passRate: 0.22},
                {rarity: Rarity.VERY_RARE, passRate: 0.03}]

        }
    ];


    public static rollCoatType(offspring: Reosean[], sire: Reosean, dam: Reosean) {

        offspring.forEach(child => {
            let raritySet = new Set<Rarity>().add(sire.coatType.rarity).add(sire.coatType.rarity);
            let passRate = this.coatTypePassRates.find(value => this.isSetsEqual(raritySet, value.raritySet))!;
            let roll = SecureRandom.secureRandom();

            let prevPasChance = 0.0;
            let rarity;
            passRate.rollChance.forEach(value => {
                if (prevPasChance < roll && roll <= prevPasChance + value.passRate) {
                    rarity = value.rarity;
                }
                prevPasChance += value.passRate
            });

            child.coatType = COAT_TYPES.find(trait => trait.rarity == rarity)!;
        });
    }

    private static isSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
}

interface CoatTypePassRate {
    raritySet: Set<Rarity>;
    rollChance: PassRateByRarity[];
}

interface PassRateByRarity {
    rarity: Rarity;
    passRate: number;
}
