import {RollReoseanRequest} from "../../../common-models/rest/roll-reosean-request";
import {RollReoseanResponse} from "../../../common-models/rest/roll-reosean-response";
import {Reosean} from "../../../common-models/reosean";
import {PoliticalStatusRoller} from "../rollers/political-status-roller";
import {SpeciesRoller} from "../rollers/species-roller";
import {HealthStatusRoller} from "../rollers/health-status-roller";
import {GenderRoller} from "../rollers/gender-roller";
import {BodyTypeRoller} from "../rollers/body-type-roller";
import {NonPassableRoller} from "../rollers/non-passable-roller";
import {GlintRoller} from "../rollers/glint-roller";
import {CoatColourRoller} from "../rollers/coat-colour-roller";
import {MarkingsRoller} from "../rollers/markings-roller";
import {TraitsRoller} from "../rollers/traits-roller";
import {SkillsRoller} from "../rollers/skills-roller";
import {SecureRandom} from "../security/secure-random";
import {CoatTypeRoller} from "../rollers/coat-type-roller";

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
        this.filterChimeraGenotype(sire, dam);
        let offspring: Reosean[] = SpeciesRoller.generateLitterBySpecies(sire, dam);

        GenderRoller.rollGender(offspring);
        HealthStatusRoller.rollHealthStatus(offspring, request.inbred);
        BodyTypeRoller.rollBodyType(offspring, sire, dam);
        NonPassableRoller.rollNonPassables(offspring);
        MarkingsRoller.rollMarkings(offspring, sire, dam);
        CoatTypeRoller.rollCoatType(offspring, sire, dam);
        CoatColourRoller.rollCoatColour(offspring, sire, dam);
        GlintRoller.rollGlint(offspring);
        TraitsRoller.rollTraits(offspring, sire, dam);
        SkillsRoller.rollSkills(offspring, sire, dam);

        rollReoseanResponse.offspring = offspring;
        return rollReoseanResponse;
    }


    private filterChimeraGenotype(sire: Reosean, dam: Reosean) {
        sire.genotypes = [sire.genotypes[SecureRandom.secureRangeRoll(0, sire.genotypes.length - 1)]];
        dam.genotypes = [dam.genotypes[SecureRandom.secureRangeRoll(0, dam.genotypes.length - 1)]];
    }
}
