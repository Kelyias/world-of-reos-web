import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClipboardService} from "ngx-clipboard";
import {RollReoseanResponse} from "../../../../common-models/rest/roll-reosean-response";
import {Reosean} from "../../../../common-models/reosean";
import {Helpers} from "../utils/helpers";
import {Genotype} from "../../../../common-models/genotype";
import {Marking} from "../../../../common-models/marking";
import {GeneType} from "../../../../common-models/gene-type";
import {Skill} from "../../../../common-models/skill";
import {MarkingSort} from "../../../../common-models/marking-sort";
import {RollerService} from "../services/roller.service";

@Component({
  selector: 'app-litter',
  templateUrl: './litter.component.html',
  styleUrls: ['./litter.component.scss']
})
export class LitterComponent implements OnInit {

  @Output() trigger = new EventEmitter();
  litterText = '';

  constructor(private clipboardService: ClipboardService, private rollerService: RollerService) {
    this.rollerService.$restForm.subscribe(() => {
      this.litterText = '';
    });
  }

  ngOnInit() {
  }

  public setLitterText(text: string) {
    this.litterText = text;
  }

  triggerRoll() {
    this.trigger.emit();
  }

  copyToClipboard() {
    this.clipboardService.copyFromContent(this.litterText);
  }

  displayResults(response: RollReoseanResponse) {
    let text = '';

    response.offspring.map(child => this.reoseanToString(child))
      .forEach((childText, i) => text += `${i + 1}) ` + childText + '\n');

    text += '\n' + response.additionalFeedback;

    this.setLitterText(text);
  }

  private reoseanToString(child: Reosean): string {
    return `(${Helpers.toTitleCase(child.gender)} - ${Helpers.toTitleCase(child.species)} - ${Helpers.toTitleCase(child.bodyType.type)} - ${Helpers.toTitleCase(child.healthStatus)})\n` +
      `F: ${Helpers.toTitleCase(child.coatType.name)} Coat\n` +
      `T: ${Helpers.toTitleCase(child.earTrait.name)} Ears, ${Helpers.toTitleCase(child.tailTrait.name)} Tail, ${Helpers.toTitleCase(child.eyeTrait.name)} Eyes\n` +
      `P: ${this.phenotypeToString(child.genotypes)}\n` +
      `G: ${this.genotypeToString(child.genotypes)}\n` +
      `${child.nonPassable ? `[ ${child.nonPassable.toLocaleUpperCase()} ]` : ''}` +
      `${child.magicTrait ? `[ ${child.magicTrait.name.toLocaleUpperCase()} ]` : ''}` +
      `${child.mutation ? `[ ${child.mutation.toLocaleUpperCase()} ]` : ''}` +
      `${child.mutation || child.magicTrait || child.nonPassable ? `\n` : ''}` +
      `${child.skills && child.skills.length > 0 ? '<b>Skills:</b> ' + this.skillsToString(child.skills) + '\n' : ''}`;
  }

  private phenotypeToString(genotypes: Genotype[]): string {
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

  private genotypeToString(genotypes: Genotype[]): string {
    let text = '';
    genotypes.forEach((genotype, i) => {
      let markings = genotype.markings.filter(marking => marking.markingGene.phenotype != 'Glint');
      let glint = genotype.markings.find(marking => marking.markingGene.phenotype == 'Glint');

      text += `${i > 0 ? ' // ' : ''}` +
        `${genotype.coatColour.colourSymbol}+` +
        `${genotype.markings ? markings.map(value => this.getGeneSymbol(value)).join('/') : ''}` +
        `${genotype.glint ? '/' + this.getGeneSymbol(glint) + '-' + genotype.glint.colourSymbol : ''}`;

    });
    return text;
  }

  private getGeneSymbol(marking: Marking): string {
    return marking.geneType == GeneType.DOMINATE ? marking.markingGene.dominateSymbol : marking.markingGene.recessiveSymbol;
  }

  private skillsToString(skills: Skill[]): string {
    let text = '';

    skills.forEach(skill => {
      text += `\n- <u>${skill.name}:</u>\n\t${skill.description}`;
    });

    return text;
  }
}
