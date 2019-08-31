import {Species} from "../../../common-models/species";
import {Reosean} from "../../../common-models/reosean";
import {SecureRandom} from "../security/secure-random";
import {Supplement, SupplementRule} from "../../../common-models/supplement";

export class SpeciesRoller {

    private static MIN_LITTER_SIZE = 1;
    private static TWINSCUIT_MIN_LITTER_SIZE = 2;
    private static MAX_VAYRON_LITTER_SIZE = 4;
    private static MAX_TYRIAN_LITTER_SIZE = 3;
    private static MIXED_VAYRON_CHANCE = 0.8;

    public static generateLitterBySpecies(sire: Reosean, dam: Reosean, supplements: Supplement[], additionalFeedback: string[]): Reosean[] {
        let minLitterSize;
        let supplement = supplements.find(value => value.rule == SupplementRule.MIN_PUPS_UP);
        if (supplement) {
            minLitterSize = this.TWINSCUIT_MIN_LITTER_SIZE;
            additionalFeedback.push(supplement.name + ' was consumed!')
        } else {
            minLitterSize = this.MIN_LITTER_SIZE;
        }

        if (sire.species == Species.VAYRON && dam.species == Species.VAYRON) {
            return Array(SecureRandom.secureRangeRoll(minLitterSize, this.MAX_VAYRON_LITTER_SIZE)).fill(null).map(() =>
                SpeciesRoller.newOffspring(Species.VAYRON));
        } else if (sire.species == Species.TYRIAN && dam.species == Species.TYRIAN) {
            return Array(SecureRandom.secureRangeRoll(minLitterSize, this.MAX_TYRIAN_LITTER_SIZE)).fill(null).map(() =>
                SpeciesRoller.newOffspring(Species.TYRIAN));
        } else {
            return Array(SecureRandom.secureRangeRoll(minLitterSize, this.MAX_TYRIAN_LITTER_SIZE)).fill(null).map(() =>
                SpeciesRoller.newOffspring(SecureRandom.secureCheckRoll(this.MIXED_VAYRON_CHANCE) ? Species.VAYRON : Species.TYRIAN));
        }
    }

    private static newOffspring(species: Species) {
        let reosean = new Reosean();
        reosean.species = species;
        return reosean
    }
}
