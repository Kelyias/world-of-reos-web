import {Reosean} from "../../../common-models/reosean";
import {SecureRandom} from "../security/secure-random";
import {Gender} from "../../../common-models/gender";

export class GenderRoller {

    private static genderPassRoll = 0.5;

    public static rollGender(offspring: Reosean[]) {
        offspring.forEach(child => {
            child.gender = SecureRandom.secureCheckRoll(this.genderPassRoll) ? Gender.MALE : Gender.FEMALE;
        });
    }
}
