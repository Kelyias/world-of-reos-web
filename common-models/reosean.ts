import {Marking, MarkingGene} from "./marking";
import {Gender} from "./gender";
import {Species} from "./species";
import {Body} from "./body";
import {HealthStatus} from "./health-status";
import {CoatType} from "./coat-type";
import {CoatColour} from "./coat-colour";
import {Trait} from "./trait";
import {Mutation} from "./mutation";
import {MagicTrait} from "./magic-trait";
import {NonPassable} from "./non-passable";
import {PoliticalStatus} from "./political-status";

export class Reosean {
    gender: Gender;
    species: Species;
    politicalStatus: PoliticalStatus;
    bodyType: Body;
    healthStatus: HealthStatus;
    coatType: CoatType;
    coatColour: CoatColour;
    traits: Trait[];
    genotype: Marking[][];
    glint?: CoatColour[];
    mutation?: Mutation;
    magicTrait?: MagicTrait;
    nonPassable?: NonPassable;
}
