import {Reosean} from "../../../common-models/reosean";

export class CoatColourRoller {

    public static rollCoatColour(offspring: Reosean[], sire: Reosean, dam: Reosean) {
        // let colourIndex1 = COAT_COLOUR_WHEEL.findIndex(colour => colour == sire.coatColour);
        // let colourIndex2 = COAT_COLOUR_WHEEL.findIndex(colour => colour == dam.coatColour);
        // let minIndex = Math.min(colourIndex1, colourIndex2);
        // let maxIndex = Math.max(colourIndex1, colourIndex2);
        //
        // let colourRange;
        // let rangeLength = Math.abs((colourIndex2 - colourIndex1));
        // if (rangeLength <= COAT_COLOUR_WHEEL.length / 2) {
        //     colourRange = COAT_COLOUR_WHEEL.filter((colour, index) => index >= minIndex && index <= maxIndex);
        // } else {
        //     colourRange = COAT_COLOUR_WHEEL.filter((colour, index) => index <= minIndex && index >= maxIndex);
        // }
        //
        // offspring.forEach(child => child.coatColour = colourRange[SecureRandom.secureRangeRoll(0, colourRange.length - 1)])
    }

}
