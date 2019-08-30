import {Gender} from "./gender";
import {Species} from "./species";
import {ReoseanBody} from "./body";
import {HealthStatus} from "./health-status";
import {CoatType} from "./coat-type";
import {Trait} from "./trait";
import {Mutation} from "./mutation";
import {MagicTrait} from "./magic-trait";
import {NonPassable} from "./non-passable";
import {PoliticalStatus} from "./political-status";
import {Skill} from "./skill";
import {Genotype} from "./genotype";

export class Reosean {
    gender: Gender;
    species: Species;
    politicalStatus: PoliticalStatus;
    bodyType: ReoseanBody;
    healthStatus: HealthStatus;
    coatType: CoatType;
    earTrait: Trait;
    tailTrait: Trait;
    eyeTrait: Trait;
    genotypes: Genotype[];
    skills: Skill[];
    mutation?: Mutation;
    magicTrait?: MagicTrait;
    nonPassable?: NonPassable;
}
