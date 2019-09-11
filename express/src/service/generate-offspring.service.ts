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
            rollReoseanResponse.additionalFeedback = 'This breeding resulted in an empty litter.';
            return rollReoseanResponse;
        }
        let additionalFeedback: string[] = [];
        this.selectChimeraGenotype(sire, dam);
        let offspring: Reosean[] = SpeciesRoller.generateLitterBySpecies(sire, dam, request.supplements, additionalFeedback);

        GenderRoller.rollGender(offspring, request.supplements, additionalFeedback);
        HealthStatusRoller.rollHealthStatus(offspring, request.inbred, request.inbredReason, additionalFeedback);
        BodyTypeRoller.rollBodyType(offspring, sire, dam, request.supplements, additionalFeedback);
        NonPassableRoller.rollNonPassables(offspring);
        MarkingsRoller.rollMarkings(offspring, sire, dam);
        CoatTypeRoller.rollCoatType(offspring, sire, dam);
        CoatColourRoller.rollCoatColour(offspring, sire, dam, request.supplements, additionalFeedback);
        GlintRoller.rollGlint(offspring, request.supplements, additionalFeedback);
        TraitsRoller.rollTraits(offspring, sire, dam);
        SkillsRoller.rollSkills(offspring, sire, dam, additionalFeedback);

        rollReoseanResponse.offspring = offspring;
        rollReoseanResponse.additionalFeedback = additionalFeedback.join('\n');
        return rollReoseanResponse;
    }


    private selectChimeraGenotype(sire: Reosean, dam: Reosean) {
        sire.genotypes = [sire.genotypes[SecureRandom.secureRangeRoll(0, sire.genotypes.length - 1)]];
        dam.genotypes = [dam.genotypes[SecureRandom.secureRangeRoll(0, dam.genotypes.length - 1)]];
    }
}
