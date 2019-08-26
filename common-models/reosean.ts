import {Marking} from "./marking";
import {Gender} from "./gender";
import {Species} from "./species";
import {BodyType} from "./body-type";
import {HealthStatus} from "./health-status";
import {CoatType} from "./coat-type";
import {CoatColour} from "./coat-colour";
import {Trait} from "./trait";
import {Mutation} from "./mutation";
import {MagicTrait} from "./magic-trait";
import {NonPassable} from "./non-passable";

export class Reosean {
    gender: Gender;
    species: Species;
    bodyType: BodyType;
    healthStatus: HealthStatus;
    coatType: CoatType;
    coatColour: CoatColour;
    traits: Trait[];
    genotype: Marking[][];
    glint?: CoatColour;
    mutation?: Mutation;
    magicTrait?: MagicTrait;
    nonPassable?: NonPassable;
}
