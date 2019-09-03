import {Reosean} from "../../../../common-models/reosean";
import {Helpers} from "./helpers";
import {Genotype} from "../../../../common-models/genotype";
import {MarkingSort} from "../../../../common-models/marking-sort";
import {Marking} from "../../../../common-models/marking";
import {GeneType} from "../../../../common-models/gene-type";
import {Skill} from "../../../../common-models/skill";

export class ReoseanStringHelpers {

  public static reoseanToString(child: Reosean): string {
    return `(${Helpers.toTitleCase(child.gender)} - ${Helpers.toTitleCase(child.species)} - ${Helpers.toTitleCase(child.bodyType.type)} - ${Helpers.toTitleCase(child.healthStatus)})\n` +
      `F: ${Helpers.toTitleCase(child.coatType.name)} Coat\n` +
      `T: ${Helpers.toTitleCase(child.earTrait.name)} Ears, ${Helpers.toTitleCase(child.tailTrait.name)}${child.tailTrait.name.includes('less') ? '' : ' Tail'}, ${Helpers.toTitleCase(child.eyeTrait.name)} Eyes\n` +
      `P: ${this.phenotypeToString(child.genotypes)}\n` +
      `G: ${this.genotypeToString(child.genotypes)}\n` +
      `${child.nonPassable ? `[ ${child.nonPassable.toLocaleUpperCase()} ]` : ''}` +
      `${child.magicTrait ? `[ ${child.magicTrait.name.toLocaleUpperCase()} ]` : ''}` +
      `${child.mutation ? `[ ${child.mutation.toLocaleUpperCase()} ]` : ''}` +
      `${child.mutation || child.magicTrait || child.nonPassable ? `\n` : ''}` +
      `${child.skills && child.skills.length > 0 ? '<b>Skills:</b> ' + this.skillsToString(child.skills) + '\n' : ''}`;
  }

  public static phenotypeToString(genotypes: Genotype[]): string {
    let text = '';
    genotypes.forEach((genotype, i) => {
      let beforeMarkings = genotype.markings.filter(marking => marking.markingGene.sorting == MarkingSort.BEFORE);
      let afterMarkings = genotype.markings.filter(marking => marking.markingGene.sorting == MarkingSort.AFTER)
        .filter(marking => marking.markingGene.phenotype != 'Glint');

      let afterMarkingsArray = afterMarkings.map(value => value.markingGene.phenotype);

      if (afterMarkingsArray.length > 0 && genotype.glint) {
        afterMarkingsArray.push('And');
      }
      if (afterMarkingsArray.length > 1 && !genotype.glint) {
        afterMarkingsArray.splice(afterMarkingsArray.length - 1, 0, 'And');
      }

      let phenotypeText = beforeMarkings.map(value => value.markingGene.phenotype);
      phenotypeText.push(genotype.coatColour.colourName);

      if (afterMarkings.length > 0 || genotype.glint) {
        phenotypeText.push('With');
      }
      phenotypeText = phenotypeText.concat(afterMarkingsArray);

      text += `${i > 0 ? ' // ' : ''}` +
        `${phenotypeText.join(' ')} ` +
        `${genotype.glint ? genotype.glint.colourName + ' Glint' : ''}`;
    });
    return text;
  }

  public static genotypeToString(genotypes: Genotype[]): string {
    let text = '';
    genotypes.forEach((genotype, i) => {
      let markings = genotype.markings.filter(marking => marking.markingGene.phenotype != 'Glint');
      let glint = genotype.markings.find(marking => marking.markingGene.phenotype == 'Glint');

      text += `${i > 0 ? ' // ' : ''}` +
        `${genotype.coatColour.colourSymbol}+` +
        `${genotype.markings ? markings.map(value => this.getGeneSymbol(value)).join('/') : ''}` +
        `${genotype.markings && genotype.markings.length == 1 && genotype.glint || genotype.markings.length == 0 ? '' : '/'}` +
        `${genotype.glint ? this.getGeneSymbol(glint) + '-' + genotype.glint.colourSymbol : ''}`;

    });
    return text;
  }

  public static getGeneSymbol(marking: Marking): string {
    return marking.geneType == GeneType.DOMINATE ? marking.markingGene.dominateSymbol : marking.markingGene.recessiveSymbol;
  }

  public static skillsToString(skills: Skill[]): string {
    let text = '';

    skills.forEach(skill => {
      text += `\n- <u>${skill.name}:</u>\n\t${skill.description}`;
    });

    return text;
  }
}
