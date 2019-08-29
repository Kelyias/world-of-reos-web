import {Reosean} from "../../../common-models/reosean";
import {SecureRandom} from "../security/secure-random";
import {Gender} from "../../../common-models/gender";

export class GenderRoller {

    public static rollGender(offspring: Reosean[]) {
        offspring.forEach(child => {
            child.gender = SecureRandom.secureCheckRoll(0.5) ? Gender.MALE : Gender.FEMALE;
        });
    }
}
