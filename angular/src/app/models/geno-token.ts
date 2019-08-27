import {Marking} from "../../../../common-models/marking";
import {CoatColour} from "../../../../common-models/coat-colour";

export class GenoToken {
  genoText: string;
  geno?: Marking | CoatColour;
  valid: boolean = true;

  constructor(marking: string) {
    this.genoText = marking;
  }
}
