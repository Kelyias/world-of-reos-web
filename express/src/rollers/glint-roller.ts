import {Reosean} from "../../../common-models/reosean";
import {COAT_COLOUR_WHEEL} from "../../../common-models/coat-colour";
import {SecureRandom} from "../security/secure-random";

export class GlintRoller {

    public static rollGlint(offspring: Reosean[]) {
        offspring.filter(child => GlintRoller.containsClintMarking(child))
            .forEach(child => {
                child.genotypes.forEach(genotype => genotype.glint = COAT_COLOUR_WHEEL[SecureRandom.secureRangeRoll(0, COAT_COLOUR_WHEEL.length - 1)]);
            })

    }

    private static containsClintMarking(child: Reosean): boolean {
        return child.genotypes.map(value => value.markings)
            .find(markings => markings.find(marking => marking.markingGene.phenotype == 'Glient') != null) != null;
    }
}
