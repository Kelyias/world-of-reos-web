import {Reosean} from "../../../common-models/reosean";
import {COAT_COLOUR_WHEEL} from "../../../common-models/coat-colour";
import {SecureRandom} from "../security/secure-random";
import {isDeepStrictEqual} from "util";

export class CoatColourRoller {

    public static rollCoatColour(offspring: Reosean[], sire: Reosean, dam: Reosean) {
        let colourIndex1 = COAT_COLOUR_WHEEL.findIndex(colour => isDeepStrictEqual(colour, sire.genotypes[0].coatColour));
        let colourIndex2 = COAT_COLOUR_WHEEL.findIndex(colour => isDeepStrictEqual(colour, dam.genotypes[0].coatColour));
        let minIndex = Math.min(colourIndex1, colourIndex2);
        let maxIndex = Math.max(colourIndex1, colourIndex2);

        let colourRange;
        let rangeLength = Math.abs((colourIndex2 - colourIndex1));
        if (rangeLength <= COAT_COLOUR_WHEEL.length / 2) {
            colourRange = COAT_COLOUR_WHEEL.filter((colour, index) => index >= minIndex && index <= maxIndex);
        } else {
            colourRange = COAT_COLOUR_WHEEL.filter((colour, index) => index <= minIndex && index >= maxIndex);
        }

        offspring.forEach(child => child.genotypes.forEach(genotype => genotype.coatColour = colourRange[SecureRandom.secureRangeRoll(0, colourRange.length - 1)]));
    }

}
