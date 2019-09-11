import {Reosean} from "../../../common-models/reosean";
import {COAT_COLOUR_WHEEL} from "../../../common-models/coat-colour";
import {SecureRandom} from "../security/secure-random";
import {Supplement, SupplementRule} from "../../../common-models/supplement";
import {GeneType} from "../../../common-models/gene-type";

export class GlintRoller {

    public static rollGlint(offspring: Reosean[], supplements: Supplement[], additionalFeedback: string[]) {

        let supplement = supplements.find(value => value.rule == SupplementRule.TARGET_GLINT);
        let glintUsed = false;

        offspring.filter(child => GlintRoller.containsGlintMarking(child))
            .forEach(child => {
                child.genotypes.forEach(genotype => {
                    genotype.glint = [];

                    let glint = supplement
                        ? supplement.target
                        : COAT_COLOUR_WHEEL[SecureRandom.secureRangeRoll(0, COAT_COLOUR_WHEEL.length - 1)];

                    genotype.glint[0] = glint;
                    glintUsed = true;

                    if (this.containsDominateGlintMarking(child)) {
                        genotype.glint[1] = COAT_COLOUR_WHEEL[SecureRandom.secureRangeRoll(0, COAT_COLOUR_WHEEL.length - 1)]
                    }
                });
            });

        if (glintUsed && supplement) {
            additionalFeedback.push(supplement.name + ' was consumed!')
        }

    }

    private static containsGlintMarking(child: Reosean): boolean {
        return child.genotypes.map(value => value.markings)
            .find(markings => markings.find(marking => marking.markingGene.phenotype == 'Glint') != null) != null;
    }

    private static containsDominateGlintMarking(child: Reosean): boolean {
        return child.genotypes.map(value => value.markings)
            .find(markings => markings.find(marking => marking.markingGene.phenotype == 'Glint' && marking.geneType == GeneType.DOMINATE) != null) != null;
    }
}
