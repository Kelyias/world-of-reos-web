import {Reosean} from "../../../common-models/reosean";
import {Marking} from "../../../common-models/marking";
import {Rarity} from "../../../common-models/rarity";
import {GeneType} from "../../../common-models/gene-type";
import {SecureRandom} from "../security/secure-random";

export class MarkingsRoller {

    private static singleDonorPassRates: SingleDonorPassRate[] = [
        {geneType: GeneType.RECESSIVE, rarity: Rarity.COMMON, passRate: 0.3},
        {geneType: GeneType.RECESSIVE, rarity: Rarity.UNCOMMON, passRate: 0.15},
        {geneType: GeneType.RECESSIVE, rarity: Rarity.MODIFIER, passRate: 0.15},
        {geneType: GeneType.RECESSIVE, rarity: Rarity.RARE, passRate: 0.02},

        {geneType: GeneType.DOMINATE, rarity: Rarity.COMMON, passRate: 1},
        {geneType: GeneType.DOMINATE, rarity: Rarity.UNCOMMON, passRate: 0.7},
        {geneType: GeneType.DOMINATE, rarity: Rarity.MODIFIER, passRate: 1},
        {geneType: GeneType.DOMINATE, rarity: Rarity.RARE, passRate: 0.4},

    ];

    private static doubleDonorPassRates: DoubleDonorPassRate[] = [
        {geneTypes: [GeneType.RECESSIVE, GeneType.RECESSIVE], rarity: Rarity.COMMON, passRate: 0.4, domPassRate: 0.05},
        {geneTypes: [GeneType.RECESSIVE, GeneType.RECESSIVE], rarity: Rarity.UNCOMMON, passRate: 0.25, domPassRate: 0.02},
        {geneTypes: [GeneType.RECESSIVE, GeneType.RECESSIVE], rarity: Rarity.MODIFIER, passRate: 0.25, domPassRate: 0.02},
        {geneTypes: [GeneType.RECESSIVE, GeneType.RECESSIVE], rarity: Rarity.RARE, passRate: 0.05, domPassRate: 0.02},

        {geneTypes: [GeneType.DOMINATE, GeneType.DOMINATE], rarity: Rarity.COMMON, passRate: 1, domPassRate: 0.05},
        {geneTypes: [GeneType.DOMINATE, GeneType.DOMINATE], rarity: Rarity.UNCOMMON, passRate: 1, domPassRate: 0.02},
        {geneTypes: [GeneType.DOMINATE, GeneType.DOMINATE], rarity: Rarity.MODIFIER, passRate: 1, domPassRate: 0.02},
        {geneTypes: [GeneType.DOMINATE, GeneType.DOMINATE], rarity: Rarity.RARE, passRate: 1, domPassRate: 0.01},

        {geneTypes: [GeneType.DOMINATE, GeneType.RECESSIVE], rarity: Rarity.COMMON, passRate: 1, domPassRate: 0.05},
        {geneTypes: [GeneType.DOMINATE, GeneType.RECESSIVE], rarity: Rarity.UNCOMMON, passRate: 0.7, domPassRate: 0.02},
        {geneTypes: [GeneType.DOMINATE, GeneType.RECESSIVE], rarity: Rarity.MODIFIER, passRate: 1, domPassRate: 0.02},
        {geneTypes: [GeneType.DOMINATE, GeneType.RECESSIVE], rarity: Rarity.RARE, passRate: 0.3, domPassRate: 0.01},

        {geneTypes: [GeneType.RECESSIVE, GeneType.DOMINATE], rarity: Rarity.COMMON, passRate: 1, domPassRate: 0.05},
        {geneTypes: [GeneType.RECESSIVE, GeneType.DOMINATE], rarity: Rarity.UNCOMMON, passRate: 0.7, domPassRate: 0.02},
        {geneTypes: [GeneType.RECESSIVE, GeneType.DOMINATE], rarity: Rarity.MODIFIER, passRate: 1, domPassRate: 0.02},
        {geneTypes: [GeneType.RECESSIVE, GeneType.DOMINATE], rarity: Rarity.RARE, passRate: 0.3, domPassRate: 0.01},
    ];

    public static rollMarkings(offspring: Reosean[], sire: Reosean, dam: Reosean) {
        offspring.forEach(child => child.genotype = []);
        offspring.forEach(child => child.genotype[0] = MarkingsRoller.rollMarkingSet(sire, dam))
    }

    private static rollMarkingSet(sire: Reosean, dam: Reosean): Marking[] {
        let markings: Marking[] = [];

        MarkingsRoller.genePoolTrip(sire.genotype[0], dam.genotype[0]);
        MarkingsRoller.genePoolTrip(dam.genotype[0], sire.genotype[0]);

        return markings
    }

    private static genePoolTrip(parentOne: Marking[], parentTwo: Marking[]) {
        let parentTwoGenePool = parentTwo.map(value => value.markingGene);
        let markings: Marking[] = [];

        parentOne
            .filter(marking => !marking.processed)
            .forEach(marking => {
                let result;
                if (parentTwoGenePool.includes(marking.markingGene)) {
                    let partnerMarking = parentTwo.filter(value => value.markingGene == marking.markingGene)[0];
                    result = MarkingsRoller.rollForGenes(marking, partnerMarking);
                    marking.processed = true;
                    partnerMarking.processed = true;
                } else {
                    result = MarkingsRoller.rollForSingleDonor(marking);
                    marking.processed = true;
                }

                if (result) {
                    markings.push(result);
                }
            });
        return markings;
    }


    private static rollForSingleDonor(marking: Marking): Marking | null {
        let singleDonorPassRate = this.singleDonorPassRates
            .filter(rate => rate.rarity == marking.markingGene.rarity)
            .filter(rate => rate.geneType == marking.geneType)[0];
        let newMarking: Marking = {
            markingGene: marking.markingGene,
            geneType: GeneType.RECESSIVE,
            processed: false
        };
        return SecureRandom.secureRandom() <= singleDonorPassRate.passRate ? newMarking : null;
    }

    private static rollForGenes(marking: Marking, partnerMarking: Marking): Marking | null {

        let doubleDonorPassRate = this.doubleDonorPassRates
            .filter(rate => rate.rarity == marking.markingGene.rarity)
            .filter(rate => rate.geneTypes[0] == marking.geneType)
            .filter(rate => rate.geneTypes[1] == partnerMarking.geneType)[0];
        let newMarking: Marking = {
            markingGene: marking.markingGene,
            geneType: SecureRandom.secureRandom() <= doubleDonorPassRate.domPassRate ? GeneType.DOMINATE : GeneType.RECESSIVE,
            processed: false
        };
        return Math.min(SecureRandom.secureRandom(), SecureRandom.secureRandom()) <= doubleDonorPassRate.passRate ? newMarking : null;
    }
}

interface SingleDonorPassRate {
    geneType: GeneType;
    rarity: Rarity;
    passRate: number;
}

interface DoubleDonorPassRate {
    geneTypes: GeneType[];
    rarity: Rarity;
    passRate: number;
    domPassRate: number;
}
