import {Reosean} from "../../../common-models/reosean";
import {Rarity} from "../../../common-models/rarity";
import {SecureRandom} from "../security/secure-random";

export class SkillsRoller {
    private static skillPassRates: SkillPassRate[] = [
        {rarity: Rarity.COMMON, passRate: 0.5},
        {rarity: Rarity.UNCOMMON, passRate: 0.25},
        {rarity: Rarity.RARE, passRate: 0.10},
    ];

    public static rollSkills(offspring: Reosean[], sire: Reosean, dam: Reosean, additionalFeedback: string[]) {
        offspring.forEach(child => this.rollSkillForChild(child, sire, dam));

        if ((sire.skills.length > 0 || dam.skills.length > 0)
            && offspring.filter(child => child.skills.length > 0).length == 0) {
            additionalFeedback.push('<i>No skills have passed down</i>')
        }
    }

    private static rollSkillForChild(child: Reosean, sire: Reosean, dam: Reosean) {
        child.skills = [];
        if (!sire.skills) sire.skills = [];
        if (!dam.skills) dam.skills = [];
        sire.skills.concat(dam.skills).forEach(skill => {

            let passRates = this.skillPassRates.find(passRate => passRate.rarity == skill.rarity)!.passRate;
            if (SecureRandom.secureCheckRoll(passRates)) {
                child.skills.push(skill);
            }
        });
    }
}

interface SkillPassRate {
    rarity: Rarity;
    passRate: number;
}
