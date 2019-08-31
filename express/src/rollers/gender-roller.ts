import {Reosean} from "../../../common-models/reosean";
import {SecureRandom} from "../security/secure-random";
import {Gender} from "../../../common-models/gender";
import {Supplement, SupplementRule} from "../../../common-models/supplement";

export class GenderRoller {

    private static genderPassRoll = 0.5;

    public static rollGender(offspring: Reosean[], supplements: Supplement[], additionalFeedback: string[]) {
        let allMale = supplements.find(value => value.rule == SupplementRule.ALL_MALE);
        let allFemale = supplements.find(value => value.rule == SupplementRule.ALL_FEMALE);

        if (allMale) {
            additionalFeedback.push(allMale.name + ' was consumed!')
        } else if (allFemale) {
            additionalFeedback.push(allFemale.name + ' was consumed!')
        }

        offspring.forEach(child => {
            if (allMale) {
                child.gender = Gender.MALE;
            } else if (allFemale) {
                child.gender = Gender.FEMALE;
            } else {
                child.gender = SecureRandom.secureCheckRoll(this.genderPassRoll) ? Gender.MALE : Gender.FEMALE;
            }
        });
    }
}
