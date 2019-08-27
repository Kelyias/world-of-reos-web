import {Species} from "./species";

export class Body {
    bodyType: BodyType;
    species: Species
}

export enum BodyType {
    EMPYRIAN='empyrian',
    RUNNER='runner',
    CHASER='chaser',
    PULLER='puller'
}

export const BODY_TYPES: Body[] = [
    {bodyType: BodyType.RUNNER, species: Species.VAYRON},
    {bodyType: BodyType.CHASER, species: Species.VAYRON},
    {bodyType: BodyType.PULLER, species: Species.VAYRON},
    {bodyType: BodyType.EMPYRIAN, species: Species.TYRIAN}
];
