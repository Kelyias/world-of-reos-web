import {RollReoseanRequest} from "../../../common-models/rest/roll-reosean-request";
import {RollReoseanResponse} from "../../../common-models/rest/roll-reosean-response";
import {Reosean} from "../../../common-models/reosean";
import {PoliticalStatusRoller} from "../rollers/political-status-roller";
import {SpeciesRoller} from "../rollers/species-roller";
import {HealthStatusRoller} from "../rollers/health-status-roller";
import {GenderRoller} from "../rollers/gender-roller";
import {BodyTypeRoller} from "../rollers/body-type-roller";

export class GenerateOffspringService {
    public getOffspring(request: RollReoseanRequest): RollReoseanResponse {
        let rollReoseanResponse = new RollReoseanResponse();

        let sire = request.sire;
        let dam = request.dam;
        if (!PoliticalStatusRoller.checkPoliticalStatus(sire, dam)) {
            rollReoseanResponse.offspring = [];
            rollReoseanResponse.additionalFeedback = 'Empty litter';
            return rollReoseanResponse;
        }
        let offspring: Reosean[] = SpeciesRoller.generateLitterBySpecies(sire, dam);

        GenderRoller.rollGender(offspring);
        HealthStatusRoller.rollHealthStatus(offspring, request.inbred);
        BodyTypeRoller.rollBodyType(offspring, sire, dam);
        this.rollCoatColour(offspring, sire, dam);
        this.rollMarkings(offspring, sire, dam);
        this.rollGlint(offspring);
        this.rollNonPassables(offspring);
        this.rollTraits(offspring, sire, dam);
        this.rollSkills(offspring, sire, dam);

        rollReoseanResponse.offspring = offspring;
        return rollReoseanResponse;
    }



    private rollCoatColour(offspring: Reosean[], sire: Reosean, dam: Reosean) {

    }

    private rollMarkings(offspring: Reosean[], sire: Reosean, dam: Reosean) {

    }

    private rollGlint(offspring: Reosean[]) {

    }

    private rollNonPassables(offspring: Reosean[]) {

    }

    private rollTraits(offspring: Reosean[], sire: Reosean, dam: Reosean) {

    }

    private rollSkills(offspring: Reosean[], sire: Reosean, dam: Reosean) {

    }


}
