import {Reosean} from "../../../common-models/reosean";
import {Species} from "../../../common-models/species";
import {BODY_TYPES, BodyType, ReoseanBody} from "../../../common-models/body";
import {SecureRandom} from "../security/secure-random";

export class BodyTypeRoller {

    private static speciesRollChanges: SpeciesRollChances[] = [
        {
            parentsSet: new Set<BodyType>().add(BodyType.RUNNER).add(BodyType.RUNNER),
            successChance: 1,
            successResult: BodyType.RUNNER,
            failResult: BodyType.RUNNER
        },
        {
            parentsSet: new Set<BodyType>().add(BodyType.RUNNER).add(BodyType.CHASER),
            successChance: 0.7,
            successResult: BodyType.RUNNER,
            failResult: BodyType.CHASER
        },
        {
            parentsSet: new Set<BodyType>().add(BodyType.RUNNER).add(BodyType.PULLER),
            successChance: .6,
            successResult: BodyType.RUNNER,
            failResult: BodyType.PULLER
        },
        {
            parentsSet: new Set<BodyType>().add(BodyType.CHASER).add(BodyType.CHASER),
            successChance: 0.8,
            successResult: BodyType.CHASER,
            failResult: BodyType.RUNNER
        },
        {
            parentsSet: new Set<BodyType>().add(BodyType.CHASER).add(BodyType.PULLER),
            successChance: 0.6,
            successResult: BodyType.CHASER,
            failResult: BodyType.RUNNER
        },
        {
            parentsSet: new Set<BodyType>().add(BodyType.PULLER).add(BodyType.PULLER),
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


        let speciesSet = new Set<BodyType>().add(sireBodyType).add(damBodyType);
        speciesSet.delete(BodyType.EMPYRIAN);
        return this.speciesRollChanges.find(value => this.isSetsEqual(speciesSet, value.parentsSet))!;
    }

    private static isSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
}

export interface SpeciesRollChances {

    parentsSet: Set<BodyType>,
    successChance: number,
    successResult: BodyType,
    failResult: BodyType
}
