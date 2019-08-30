import {Reosean} from "../../../common-models/reosean";
import {Rarity} from "../../../common-models/rarity";
import {SecureRandom} from "../security/secure-random";

export class SkillsRoller {
    private static skillPassRates: SkillPassRate[] = [
        {rarity: Rarity.COMMON, passRate: 0.5},
        {rarity: Rarity.UNCOMMON, passRate: 0.25},
        {rarity: Rarity.RARE, passRate: 0.10},
    ];

    public static rollSkills(offspring: Reosean[], sire: Reosean, dam: Reosean) {
        offspring.forEach(child => this.rollSkillForChild(child, sire, dam));
    }

    private static rollSkillForChild(child: Reosean, sire: Reosean, dam: Reosean) {
        child.skills = [];
        sire.skills.concat(dam.skills).forEach(skill => {

            let passRates = this.skillPassRates.filter(passRate => passRate.rarity == skill.rarity)[0].passRate;
            if (SecureRandom.secureCheckRoll(passRates)) {
                child.skills.push(skill);
            }
        })
    }
}

interface SkillPassRate {
    rarity: Rarity;
    passRate: number;
}
