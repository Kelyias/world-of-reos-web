import {Reosean} from "../../../common-models/reosean";
import {COAT_COLOUR_WHEEL} from "../../../common-models/coat-colour";
import {SecureRandom} from "../security/secure-random";
import {Supplement, SupplementRule} from "../../../common-models/supplement";

export class GlintRoller {

    public static rollGlint(offspring: Reosean[], supplements: Supplement[], additionalFeedback: string[]) {

        let supplement = supplements.find(value => value.rule == SupplementRule.TARGET_GLINT);
        let glintUsed = false;

        offspring.filter(child => GlintRoller.containsClintMarking(child))
            .forEach(child => {
                child.genotypes.forEach(genotype => {
                    genotype.glint =
                        supplement
                            ? supplement.target
                            : COAT_COLOUR_WHEEL[SecureRandom.secureRangeRoll(0, COAT_COLOUR_WHEEL.length - 1)];
                    glintUsed = true;
                });
            })

        if (glintUsed && supplement) {
            additionalFeedback.push(supplement.name + ' was consumed!')
        }

    }

    private static containsClintMarking(child: Reosean): boolean {
        return child.genotypes.map(value => value.markings)
            .find(markings => markings.find(marking => marking.markingGene.phenotype == 'Glint') != null) != null;
    }
}
