import {RollReoseanRequest} from "../../../common-models/rest/roll-reosean-request";
import {RollReoseanResponse} from "../../../common-models/rest/roll-reosean-response";
import {Reosean} from "../../../common-models/reosean";
import {PoliticalStatus} from "../../../common-models/political-status";
import {Species} from "../../../common-models/species";
import {Gender} from "../../../common-models/gender";
import {HealthStatus} from "../../../common-models/health-status";
import crypto from "crypto";

export class GenerateOffspringService {
    public getOffspring(request: RollReoseanRequest): RollReoseanResponse {
        let rollReoseanResponse = new RollReoseanResponse();

        let sire = request.sire;
        let dam = request.dam;
        if (!this.checkPoliticalStatus(sire, dam)) {
            rollReoseanResponse.offspring = [];
            rollReoseanResponse.additionalFeedback = 'Empty litter';
            return rollReoseanResponse;
        }
        let offspring: Reosean[] = this.generateLitterBySpecies(sire, dam);

        this.assignGender(offspring);
        this.rollHealthStatus(offspring, request.inbred);
        this.rollBodyType(offspring, sire, dam);
        this.rollCoatColour(offspring, sire, dam);
        this.rollMarkings(offspring, sire, dam);
        this.rollGlint(offspring);
        this.rollNonPassables(offspring);
        this.rollTraits(offspring, sire, dam);
        this.rollSkills(offspring, sire, dam);

        rollReoseanResponse.offspring = offspring;
        return rollReoseanResponse;
    }

    private checkPoliticalStatus(sire: Reosean, dam: Reosean): boolean {
        let nonCitizens = [sire, dam].filter(value => value.politicalStatus != PoliticalStatus.CITIZEN);
        if (nonCitizens.length > 1) {
            return true;
        } else if (nonCitizens.length == 0) {
            return this.checkMateChanceWithCitizen(PoliticalStatus.CITIZEN);
        } else {
            return this.checkMateChanceWithCitizen(nonCitizens[0].politicalStatus);
        }
    }

    private generateLitterBySpecies(sire: Reosean, dam: Reosean): Reosean[] {
        if (sire.species == Species.VAYRON && dam.species == Species.VAYRON) {
            return Array(this.secureRangeRoll(1, 4)).fill(null).map(() =>
                this.newOffspring(Species.VAYRON));
        } else if (sire.species == Species.TYRIAN && dam.species == Species.TYRIAN) {
            return Array(this.secureRangeRoll(1, 3)).fill(null).map(() =>
                this.newOffspring(Species.TYRIAN));
        } else {
            return Array(this.secureRangeRoll(1, 3)).fill(null).map(() =>
                this.newOffspring(this.secureCheckRoll(0.8) ? Species.VAYRON : Species.TYRIAN));
        }
    }

    private newOffspring(species: Species) {
        let reosean = new Reosean();
        reosean.species = species;
        return reosean
    }

    private assignGender(offspring: Reosean[]) {
        offspring.forEach(child => {
            child.gender = this.secureCheckRoll(0.5) ? Gender.MALE : Gender.FEMALE;
        });
    }

    private rollBodyType(offspring: Reosean[], sire: Reosean, dam: Reosean) {

    }

    private rollHealthStatus(offspring: Reosean[], inbred: boolean) {
        offspring.forEach(child => {
            child.healthStatus = inbred ? HealthStatus.HEALTHY : this.rollInbred();
        });
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

    private checkMateChanceWithCitizen(politicalStatus: PoliticalStatus) {
        switch (politicalStatus) {
            case PoliticalStatus.CITIZEN:
                return this.secureCheckRoll(0.5);
            case PoliticalStatus.RECOGNIZED:
                return this.secureCheckRoll(0.5);
            case PoliticalStatus.EXEMPLAR:
                return this.secureCheckRoll(0.75);
            case PoliticalStatus.NOBLE:
                return this.secureCheckRoll(0.9);
            case PoliticalStatus.PARAMOUNT:
                return true;
            default:
                return false;

        }
        return false;
    }

    private secureRandom(): number {
        return parseInt(crypto.randomBytes(4).toString('hex'), 16) / (4_294_967_295);
    }

    private secureCheckRoll(targetPassPercentage: number): boolean {
        return this.secureRandom() <= targetPassPercentage;
    }

    private secureRangeRoll(min: number, max: number): number {
        return Math.floor(this.secureRandom() * (max - min + 1)) + min;
    }

    private rollInbred(): HealthStatus {
        let roll = this.secureRandom();
        if (roll <= 0.1) {
            return HealthStatus.HEALTHY
        } else if (roll <= 0.5) {
            return HealthStatus.STILLBORN
        } else if (roll <= 0.8) {
            return HealthStatus.BLIND
        } else {
            return HealthStatus.INFERTILE
        }
    }
}
