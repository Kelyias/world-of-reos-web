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

@Component({
  selector: 'app-litter',
  templateUrl: './litter.component.html',
  styleUrls: ['./litter.component.scss']
})
export class LitterComponent implements OnInit {

  @Output() trigger = new EventEmitter();
  litterText = '';

  constructor(private clipboardService: ClipboardService) {
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
      .forEach((childText, i) => text += `\n\n${i + 1}) ` + childText);

    text += '\n\n' + response.additionalFeedback;

    this.setLitterText(text);
  }

  private reoseanToString(child: Reosean): string {
    return `(${Helpers.toTitleCase(child.gender)} - ${Helpers.toTitleCase(child.species)} - ${Helpers.toTitleCase(child.bodyType.type)} - ${Helpers.toTitleCase(child.healthStatus)})\n` +
      `F: ${Helpers.toTitleCase(child.coatType.name)} Coat\n` +
      `T: ${Helpers.toTitleCase(child.earTrait.name)} Ears, ${Helpers.toTitleCase(child.tailTrait.name)} Tail, ${Helpers.toTitleCase(child.earTrait.name)} Eyes\n` +
      `P: ${this.phenotypeToString(child.genotypes)}\n` +
      `G: ${this.genotypeToString(child.genotypes)}` +
      `${child.skills && child.skills.length > 0 ? '\nSkills: ' + this.skillsToString(child.skills) : ''}`;
  }

  private phenotypeToString(genotypes: Genotype[]): string {
    let text = '';
    genotypes.forEach((genotype, i) => {
      let beforeMarkings = genotype.markings.filter(marking => marking.markingGene.sorting == MarkingSort.BEFORE);
      let afterMarkings = genotype.markings.filter(marking => marking.markingGene.sorting == MarkingSort.AFTER);

      text += `${i > 0 ? ' // ' : ''}` +
        `${beforeMarkings.map(value => value.markingGene.phenotype).join(' ')} ` +
        `${genotype.coatColour.colourName} ` +
        `${afterMarkings.map(value => value.markingGene.phenotype).join(' ')} ` +
        `${genotype.glint ? genotype.glint.colourName + 'Glint' : ''}`;
    });
    return text;
  }

  private genotypeToString(genotypes: Genotype[]): string {
    let text = '';
    genotypes.forEach((genotype, i) => {
      text += `${i > 0 ? ' // ' : ''}` +
        `${genotype.coatColour.colourSymbol}+` +
        `${genotype.markings ? genotype.markings.map(value => this.getGeneSymbol(value)).join('/') : ''}` +
        `${genotype.glint ? '/' + this.getGeneSymbol(genotype.markings[genotype.markings.length - 1]) + '-' + genotype.glint.colourSymbol : ''}`;

    });
    return text;
  }

  private getGeneSymbol(marking: Marking): string {
    return marking.geneType == GeneType.DOMINATE ? marking.markingGene.dominateSymbol : marking.markingGene.recessiveSymbol;
  }

  private skillsToString(skills: Skill[]): string {
    let text = '';

    skills.forEach(skill => {
      text += `\n- ${skill.name}:\n\t${skill.description}`;
    });

    return text;
  }
}
