import {Species} from "./species";

export class ReoseanBody {
    type: BodyType;
    species: Species
}

export enum BodyType {
    EMPYRIAN='EMPYRIAN',
    RUNNER='RUNNER',
    CHASER='CHASER',
    PULLER='PULLER'
}

export const BODY_TYPES: ReoseanBody[] = [
    {type: BodyType.RUNNER, species: Species.VAYRON},
    {type: BodyType.CHASER, species: Species.VAYRON},
    {type: BodyType.PULLER, species: Species.VAYRON},
    {type: BodyType.EMPYRIAN, species: Species.TYRIAN}
];
