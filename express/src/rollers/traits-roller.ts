import {Reosean} from "../../../common-models/reosean";
import {Rarity} from "../../../common-models/rarity";
import {Trait, TRAITS} from "../../../common-models/trait";
import {SecureRandom} from "../security/secure-random";
import {TraitType} from "../../../common-models/trait-type";

export class TraitsRoller {

    private static traitPassRates: TraitPassRate[] = [
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
                {rarity: Rarity.COMMON, passRate: 0.5},
                {rarity: Rarity.UNCOMMON, passRate: 0.5}]
        },
        {
            raritySet: new Set<Rarity>().add(Rarity.COMMON).add(Rarity.RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.6},
                {rarity: Rarity.UNCOMMON, passRate: 0.3},
                {rarity: Rarity.RARE, passRate: 0.1}]
        },
        {
            raritySet: new Set<Rarity>().add(Rarity.COMMON).add(Rarity.VERY_RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.5},
                {rarity: Rarity.UNCOMMON, passRate: 0.3},
                {rarity: Rarity.RARE, passRate: 0.18},
                {rarity: Rarity.VERY_RARE, passRate: 0.02}]

        },
        //UNCOMMON
        {
            raritySet: new Set<Rarity>().add(Rarity.UNCOMMON).add(Rarity.UNCOMMON),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.7},
                {rarity: Rarity.UNCOMMON, passRate: 0.3}]
        },
        {
            raritySet: new Set<Rarity>().add(Rarity.UNCOMMON).add(Rarity.RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.4},
                {rarity: Rarity.UNCOMMON, passRate: 0.4},
                {rarity: Rarity.RARE, passRate: 0.2}]
        },
        {
            raritySet: new Set<Rarity>().add(Rarity.UNCOMMON).add(Rarity.VERY_RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.45},
                {rarity: Rarity.UNCOMMON, passRate: 0.35},
                {rarity: Rarity.RARE, passRate: 0.15},
                {rarity: Rarity.VERY_RARE, passRate: 0.05}]

        },
        //RARE
        {
            raritySet: new Set<Rarity>().add(Rarity.RARE).add(Rarity.RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.30},
                {rarity: Rarity.UNCOMMON, passRate: 0.35},
                {rarity: Rarity.RARE, passRate: 0.35}]
        },
        {
            raritySet: new Set<Rarity>().add(Rarity.RARE).add(Rarity.VERY_RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.30},
                {rarity: Rarity.UNCOMMON, passRate: 0.30},
                {rarity: Rarity.RARE, passRate: 0.30},
                {rarity: Rarity.VERY_RARE, passRate: 0.10}]

        },
        //VERY RARE
        {
            raritySet: new Set<Rarity>().add(Rarity.VERY_RARE).add(Rarity.VERY_RARE),
            rollChance: [
                {rarity: Rarity.COMMON, passRate: 0.25},
                {rarity: Rarity.UNCOMMON, passRate: 0.30},
                {rarity: Rarity.RARE, passRate: 0.30},
                {rarity: Rarity.VERY_RARE, passRate: 0.15}]

        },
    ];

    public static rollTraits(offspring: Reosean[], sire: Reosean, dam: Reosean) {
        offspring.forEach(child => {
            child.tailTrait = TraitsRoller.rollTrait(child, sire.tailTrait, dam.tailTrait, TraitType.TAIL);
            child.earTrait = TraitsRoller.rollTrait(child, sire.earTrait, dam.earTrait, TraitType.EAR);
            child.eyeTrait = TraitsRoller.rollTrait(child, sire.eyeTrait, dam.eyeTrait, TraitType.EYE);
        });
    }

    private static rollTrait(child: Reosean, sireTrait: Trait, damTrait: Trait, traitType: TraitType): Trait {
        let traitRaritySet = new Set<Rarity>().add(sireTrait.rarity).add(damTrait.rarity);
        let traitPassRate = this.traitPassRates.find(value => this.isSetsEqual(traitRaritySet, value.raritySet))!;
        let roll = SecureRandom.secureRandom();

        let prevPasChance = 0.0;
        let rarity;
        traitPassRate.rollChance.forEach(value => {
            if (prevPasChance < roll && roll <= prevPasChance + value.passRate) {
                rarity = value.rarity;
            }
            prevPasChance += value.passRate
        });

        let possibleTraits = TRAITS.filter(trait => trait.rarity == rarity && trait.species == child.species && traitType == traitType);
        return possibleTraits[SecureRandom.secureRangeRoll(0, possibleTraits.length - 1)];
    }

    private static isSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));

}

interface TraitPassRate {
    raritySet: Set<Rarity>;
    rollChance: PassRateByRarity[];
}

interface PassRateByRarity {
    rarity: Rarity;
    passRate: number;
}
