import {GenoToken} from './geno-token';

export class GenotypeToken {
  genotypeText: string;
  coatColour: GenoToken;
  markings: GenoToken[] = [];
  glintGene: GenoToken;
  glintColours: GenoToken[] = [];


  constructor(genotypeText: string) {
    this.genotypeText = genotypeText;
  }
}
