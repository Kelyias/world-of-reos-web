import {Reosean} from "../../../common-models/reosean";
import {Species} from "../../../common-models/species";
import {BODY_TYPES, BodyType, ReoseanBody} from "../../../common-models/body";
import {SecureRandom} from "../security/secure-random";

export class BodyTypeRoller {

    private static speciesRollChanges: SpeciesRollChances[] = [
        {
            parents: [BodyType.RUNNER, BodyType.RUNNER],
            successChance: 1,
            successResult: BodyType.RUNNER,
            failResult: BodyType.RUNNER
        },
        {
            parents: [BodyType.RUNNER, BodyType.CHASER],
            successChance: 0.7,
            successResult: BodyType.RUNNER,
            failResult: BodyType.CHASER
        },
        {
            parents: [BodyType.RUNNER, BodyType.PULLER],
            successChance: .6,
            successResult: BodyType.RUNNER,
            failResult: BodyType.PULLER
        },
        {
            parents: [BodyType.CHASER, BodyType.CHASER],
            successChance: 0.8,
            successResult: BodyType.CHASER,
            failResult: BodyType.RUNNER
        },
        {
            parents: [BodyType.CHASER, BodyType.PULLER],
            successChance: 0.6,
            successResult: BodyType.CHASER,
            failResult: BodyType.RUNNER
        },
        {
            parents: [BodyType.PULLER, BodyType.PULLER],
            successChance: .1,
            successResult: BodyType.PULLER,
            failResult: BodyType.RUNNER
        },
    ];


    public static rollBodyType(offspring: Reosean[], sire: Reosean, dam: Reosean) {
        offspring.forEach(child => {
            if (child.species == Species.TYRIAN) {
                child.bodyType = BODY_TYPES.find(value => value.type == BodyType.EMPYRIAN && value.species == Species.TYRIAN)!;
            } else if (child.species == Species.VAYRON) {
                child.bodyType = BodyTypeRoller.getVayronBodyType(sire.bodyType.type, dam.bodyType.type);
            }
        });
    }

    private static getVayronBodyType(sireBodyType: BodyType, damBodyType: BodyType): ReoseanBody {
        const rollEntry = BodyTypeRoller.getSpeciesRollChances(sireBodyType, damBodyType);

        let bodyType = SecureRandom.secureCheckRoll(rollEntry.successChance) ? rollEntry.successResult : rollEntry.failResult;
        return BODY_TYPES.find(value => value.type == bodyType && value.species == Species.VAYRON)!;
    }

    private static getSpeciesRollChances(sireBodyType: BodyType, damBodyType: BodyType): SpeciesRollChances {
        return this.speciesRollChanges.find(value => (value.parents[0] == sireBodyType && value.parents[1] == damBodyType)
            || (value.parents[1] == sireBodyType && value.parents[0] == damBodyType))!;
    }
}

export interface SpeciesRollChances {

    parents: BodyType[],
    successChance: number,
    successResult: BodyType,
    failResult: BodyType
}
