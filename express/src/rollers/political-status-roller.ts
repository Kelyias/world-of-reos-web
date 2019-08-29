import {PoliticalStatus} from "../../../common-models/political-status";
import {SecureRandom} from "../security/secure-random";
import {Reosean} from "../../../common-models/reosean";

export class PoliticalStatusRoller {

    private static CITIZEN_X_CITIZEN = 0.5;
    private static CITIZEN_X_RECOGNIZED = 0.5;
    private static CITIZEN_X_EXEMPLAR = 0.75;
    private static CITIZEN_X_NOBLE = 0.9;

    public static checkPoliticalStatus(sire: Reosean, dam: Reosean): boolean {
        let nonCitizens = [sire, dam].filter(value => value.politicalStatus != PoliticalStatus.CITIZEN);
        if (nonCitizens.length > 1) {
            return true;
        } else if (nonCitizens.length == 0) {
            return PoliticalStatusRoller.checkMateChanceWithCitizen(PoliticalStatus.CITIZEN);
        } else {
            return PoliticalStatusRoller.checkMateChanceWithCitizen(nonCitizens[0].politicalStatus);
        }
    }

    private static checkMateChanceWithCitizen(politicalStatus: PoliticalStatus) {
        switch (politicalStatus) {
            case PoliticalStatus.CITIZEN:
                return SecureRandom.secureCheckRoll(this.CITIZEN_X_CITIZEN);
            case PoliticalStatus.RECOGNIZED:
                return SecureRandom.secureCheckRoll(this.CITIZEN_X_RECOGNIZED);
            case PoliticalStatus.EXEMPLAR:
                return SecureRandom.secureCheckRoll(this.CITIZEN_X_EXEMPLAR);
            case PoliticalStatus.NOBLE:
                return SecureRandom.secureCheckRoll(this.CITIZEN_X_NOBLE);
            case PoliticalStatus.PARAMOUNT:
                return true;
            default:
                return false;

        }
    }
}
