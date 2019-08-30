import {Reosean} from "../../../common-models/reosean";
import {SecureRandom} from "../security/secure-random";
import {Mutation} from "../../../common-models/mutation";
import {MAGICAl_TRAITS} from "../../../common-models/magic-trait";
import {NonPassable} from "../../../common-models/non-passable";

export class NonPassableRoller {

    private static MUTATION_CHANCE = 1 / 800;

    private static MAGIC_TRAIT_CHANCE = 1 / 1000;

    private static SPECIAL_CHANCE = 1 / 500;

    public static rollNonPassables(offspring: Reosean[]) {
        offspring.forEach(child => {
            if (SecureRandom.secureCheckRoll(this.MUTATION_CHANCE)) {
                NonPassableRoller.rollMutation(child);
            }
            if (SecureRandom.secureCheckRoll(this.MAGIC_TRAIT_CHANCE)) {
                NonPassableRoller.rollMagicTrait(child);
            }
            if (SecureRandom.secureCheckRoll(this.SPECIAL_CHANCE)) {
                NonPassableRoller.rollSpecial(child);
            }
        })
    }

    private static rollMutation(child: Reosean) {
        let range = Object.keys(Mutation).length;
        child.mutation = Mutation[SecureRandom.secureRangeRoll(0, range - 1)] as Mutation
    }

    private static rollSpecial(child: Reosean) {
        let range = Object.keys(NonPassable).length;
        child.nonPassable = NonPassable[SecureRandom.secureRangeRoll(0, range - 1)] as NonPassable

    }

    private static rollMagicTrait(child: Reosean) {
        let traits = MAGICAl_TRAITS.filter(trait => trait.species == child.species);
        child.magicTrait = traits[SecureRandom.secureRangeRoll(0, traits.length - 1)];
    }
}
