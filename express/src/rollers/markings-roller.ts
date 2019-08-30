import {Reosean} from "../../../common-models/reosean";
import {Marking} from "../../../common-models/marking";
import {Rarity} from "../../../common-models/rarity";
import {GeneType} from "../../../common-models/gene-type";
import {SecureRandom} from "../security/secure-random";
import {NonPassable} from "../../../common-models/non-passable";
import {Genotype} from "../../../common-models/genotype";
import {isDeepStrictEqual} from "util";

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
        offspring.forEach(child => {
            child.genotypes = (child.nonPassable == NonPassable.CHIMERA ? new Array(2) : new Array(1))
                .fill(null)
                .map(() => new Genotype())
        });
        offspring.forEach(child => child.genotypes.forEach(genotype => genotype.markings = MarkingsRoller.rollMarkingSet(sire, dam)));
    }

    private static rollMarkingSet(sire: Reosean, dam: Reosean): Marking[] {
        let markings: Marking[] = [];
        this.resetParentMarkings([sire, dam]);
        markings.push(...MarkingsRoller.genePoolTrip(sire.genotypes[0].markings, dam.genotypes[0].markings));
        markings.push(...MarkingsRoller.genePoolTrip(dam.genotypes[0].markings, sire.genotypes[0].markings));

        return markings
    }

    private static genePoolTrip(parentOne: Marking[], parentTwo: Marking[]) {
        let parentTwoGenePool = parentTwo.map(value => value.markingGene);
        let markings: Marking[] = [];

        parentOne
            .filter(marking => !marking.processed)
            .forEach(marking => {
                let result;
                if (parentTwoGenePool.map(value => value.phenotype).includes(marking.markingGene.phenotype)) {
                    let partnerMarking = parentTwo.find(value => isDeepStrictEqual(value.markingGene, marking.markingGene))!;
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
            .filter(rate => isDeepStrictEqual(rate.rarity, marking.markingGene.rarity))
            .filter(rate => isDeepStrictEqual(rate.geneType, marking.geneType))[0];
        let newMarking: Marking = {
            markingGene: marking.markingGene,
            geneType: GeneType.RECESSIVE,
            processed: false
        };
        return SecureRandom.secureCheckRoll(singleDonorPassRate.passRate) ? newMarking : null;
    }

    private static rollForGenes(marking: Marking, partnerMarking: Marking): Marking | null {

        let doubleDonorPassRate = this.doubleDonorPassRates
            .filter(rate => rate.rarity == marking.markingGene.rarity)
            .filter(rate => isDeepStrictEqual(rate.geneTypes[0], marking.geneType))
            .filter(rate => isDeepStrictEqual(rate.geneTypes[1], partnerMarking.geneType))[0];
        let newMarking: Marking = {
            markingGene: marking.markingGene,
            geneType: SecureRandom.secureCheckRoll(doubleDonorPassRate.domPassRate) ? GeneType.DOMINATE : GeneType.RECESSIVE,
            processed: false
        };
        return Math.min(SecureRandom.secureRandom(), SecureRandom.secureRandom()) <= doubleDonorPassRate.passRate ? newMarking : null;
    }

    private static resetParentMarkings(parents: Reosean[]) {
        parents.forEach(parent => parent.genotypes[0].markings.forEach(marking => {
            marking.processed = false;
        }))
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
