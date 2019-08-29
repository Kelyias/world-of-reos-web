import {GenoToken} from "./geno-token";

export class GenotypeToken {
  genotypeText: string;
  coatColour: GenoToken;
  markings: GenoToken[] = [];
  glintGene: GenoToken;
  glintColour: GenoToken;


  constructor(genotypeText: string) {
    this.genotypeText = genotypeText;
  }
}
