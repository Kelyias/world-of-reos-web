import {MarkingGene} from '../../../../common-models/marking';
import {CoatColour} from '../../../../common-models/coat-colour';

export class GenoToken {
  genoText: string;
  geno?: MarkingGene | CoatColour;
  valid = true;

  constructor(marking: string) {
    this.genoText = marking;
  }
}
