import {Component, Input, OnInit} from '@angular/core';
import {PoliticalStatus} from '../../../../common-models/political-status';
import {Helpers} from '../utils/helpers';
import {ReosOption} from '../models/reos-option';
import {Species} from '../../../../common-models/species';
import {BODY_TYPES} from '../../../../common-models/body';
import {COAT_TYPES} from '../../../../common-models/coat-type';
import {Trait, TRAITS} from '../../../../common-models/trait';
import {TraitType} from '../../../../common-models/trait-type';
import {Rarity} from '../../../../common-models/rarity';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenoToken} from '../models/geno-token';
import {COAT_COLOUR_WHEEL, CoatColour} from '../../../../common-models/coat-colour';
import {Marking, MarkingGene, MARKINGS} from '../../../../common-models/marking';
import {GenotypeToken} from '../models/genotype-token';
import {Reosean} from '../../../../common-models/reosean';
import {GeneType} from '../../../../common-models/gene-type';
import {SKILLS} from '../../../../common-models/skill';
import {IOption} from 'ng-uikit-pro-standard';
import {Genotype} from "../../../../common-models/genotype";
import {RollerService} from "../services/roller.service";

@Component({
  selector: 'app-parent-block',
  templateUrl: './parent-block.component.html',
  styleUrls: ['./parent-block.component.scss']
})
export class ParentBlockComponent implements OnInit {
  reoseanForm: FormGroup;
  @Input('parentTitle') title: string;

  politicalStatusOptions: Array<ReosOption>;
  speciesOptions: Array<ReosOption>;
  coatTypeOptions: Array<ReosOption>;
  bodyTypeOptions: Array<ReosOption>;
  earTraits: Array<Trait>;
  tailTrait: Array<Trait>;
  eyesTrait: Array<Trait>;
  groupedEarTraitsOptionsByRarity: Map<Rarity, ReosOption[]>;
  groupedTailTraitOptionsByRarity: Map<Rarity, ReosOption[]>;
  groupedEyeTraitOptionsByRarity: Map<Rarity, ReosOption[]>;

  public geno: string;
  public genoError = false;
  public genotypeTokens: GenotypeToken[] = [];
  skillMultiOptions: Array<IOption>;
  private genoRegexp = /(?<coatColour>[a-zA-Z]+)\+(?<markings>([a-zA-Z]+)+(\/[a-zA-Z]*)*)*(\/(?<glintGene>(Gl|GG))-(?<glintColour>[a-zA-Z]+))?$/;

  constructor(private fb: FormBuilder, private rollerService: RollerService) {
    this.rollerService.$restForm.subscribe(() => {
      this.reoseanForm.reset();
      this.genotypeTokens = [];
      this.genoError = false;
      this.geno = null;
      this.ngOnInit();
    });
  }

  keepOrder = (a, b) => a;

  ngOnInit() {
    this.skillMultiOptions = [];
    this.getRarityGroup(SKILLS.map(value => Helpers.getReosOption(value, value.name, value.rarity)))
      .forEach((values, key) => {
        this.skillMultiOptions.push({
          label: key,
          value: '',
          group: true,
          icon: ''
        });
        values.forEach(value => this.skillMultiOptions.push({
          label: value.label,
          value: value.value,
          icon: ''
        }));
      });

    this.reoseanForm = this.fb.group({
      species: ['', Validators.required],
      politicalStatus: ['', Validators.required],
      bodyType: ['', Validators.required],
      coatType: ['', Validators.required],
      eyeTrait: ['', Validators.required],
      tailTrait: ['', Validators.required],
      earTrait: ['', Validators.required],
      genoInput: ['', Validators.required],
      skills: ['', Validators.required]
    });

    this.politicalStatusOptions = Helpers.convertEnumToOptionsArray(PoliticalStatus);
    this.speciesOptions = Helpers.convertEnumToOptionsArray(Species);
    this.coatTypeOptions = COAT_TYPES.map(value => Helpers.getReosOption(value, value.name));

    this.earTraits = TRAITS.filter(value => value.type == TraitType.EAR);
    this.tailTrait = TRAITS.filter(value => value.type == TraitType.TAIL);
    this.eyesTrait = TRAITS.filter(value => value.type == TraitType.EYE);

    this.updateSpeciesOptions(this.speciesOptions[0].value);


    this.reoseanForm.patchValue({
      politicalStatus: this.politicalStatusOptions[0].value,
      species: this.speciesOptions[0].value,
      coatType: this.coatTypeOptions[0].value,
    });

  }

  public isValid(): boolean {
    let valid = !this.genoError && this.genotypeTokens != null && this.genotypeTokens.length > 0;
    if (!valid) {
      this.rollerService.addFeedback(this.title + ' is invalid');
    }
    return valid;
  }

  public getReosean(): Reosean {
    const reosean = new Reosean();

    reosean.politicalStatus = this.reoseanForm.get('politicalStatus').value;
    reosean.species = this.reoseanForm.get('species').value;
    reosean.coatType = this.reoseanForm.get('coatType').value;
    reosean.bodyType = this.reoseanForm.get('bodyType').value;
    reosean.skills = this.reoseanForm.get('skills').value;
    reosean.earTrait = this.reoseanForm.get('earTrait').value;
    reosean.tailTrait = this.reoseanForm.get('tailTrait').value;
    reosean.eyeTrait = this.reoseanForm.get('eyeTrait').value;

    reosean.genotypes = this.getGenotype();

    return reosean;
  }

  updateSpeciesOptions(species) {
    this.bodyTypeOptions = BODY_TYPES
      .filter(value => value.species == species)
      .map(value => Helpers.getReosOption(value, value.type));

    this.groupedEarTraitsOptionsByRarity = this.getRarityGroup(this.earTraits
      .filter(value => value.species == species)
      .map(value => Helpers.getReosOption(value, value.name, value.rarity)));

    this.groupedTailTraitOptionsByRarity = this.getRarityGroup(this.tailTrait
      .filter(value => value.species == species)
      .map(value => Helpers.getReosOption(value, value.name, value.rarity)));

    this.groupedEyeTraitOptionsByRarity = this.getRarityGroup(this.eyesTrait
      .filter(value => value.species == species)
      .map(value => Helpers.getReosOption(value, value.name, value.rarity)));


    this.reoseanForm.patchValue({
      bodyType: this.bodyTypeOptions[0].value,
      earTrait: this.groupedEarTraitsOptionsByRarity.values().next().value[0].value,
      tailTrait: this.groupedTailTraitOptionsByRarity.values().next().value[0].value,
      eyeTrait: this.groupedEyeTraitOptionsByRarity.values().next().value[0].value,
    });
  }

  validateGeno(genoText: string) {
    this.rollerService.resetColourRange(this.title);
    this.geno = '';
    this.genotypeTokens = [];
    genoText = genoText.trim().replace(/ /g, '');
    this.genoError = false;

    const split = genoText.split('//');

    if (split.length > 2) {
      this.genoError = true;
      this.geno = 'Invalid genotype!';
      return;
    }

    split.forEach((value, i) => {
      this.processGeno(value, i);
    });
  }

  private getGenotype(): Genotype[] {
    let genotypes: Genotype[] = [];
    this.genotypeTokens.forEach(token => {
      let genotype: Genotype = new Genotype();
      genotype.coatColour = token.coatColour.geno as CoatColour;


      genotype.markings = token.markings.map(token => {
        const marking = new Marking();
        marking.markingGene = token.geno as MarkingGene;
        marking.geneType = (token.genoText == marking.markingGene.dominateSymbol ? GeneType.DOMINATE : GeneType.RECESSIVE);
        return marking;
      });

      if (token.glintGene) {

        const marking = new Marking();
        marking.markingGene = token.glintGene.geno as MarkingGene;
        marking.geneType = (token.glintGene.genoText == marking.markingGene.dominateSymbol ? GeneType.DOMINATE : GeneType.RECESSIVE);

        genotype.markings.push(marking);
        genotype.glint = token.glintColour.geno as CoatColour;
      }

      genotypes.push(genotype);

    });
    return genotypes;
  }

  private processGeno(geno, i) {
    const genotypeToken = new GenotypeToken(geno);
    this.genotypeTokens.push(genotypeToken);

    const matchArray = geno.match(this.genoRegexp);

    if (!matchArray) {
      this.genoError = true;
      this.geno = 'Invalid genotype!';
      return;
    }

    genotypeToken.coatColour = new GenoToken(matchArray.groups.coatColour);
    if (matchArray.groups.markings) {
      genotypeToken.markings = matchArray.groups.markings.split('/').map(value => new GenoToken(value));
    }

    if (matchArray.groups.glintGene) {
      genotypeToken.glintGene = new GenoToken(matchArray.groups.glintGene);
      genotypeToken.glintColour = new GenoToken(matchArray.groups.glintColour);
    }

    this.validateCoatColour([genotypeToken.coatColour, genotypeToken.glintColour]);
    let markings = [genotypeToken.glintGene];
    if (genotypeToken.markings) {
      markings = markings.concat([...genotypeToken.markings]);
    }
    this.validateMarkings(markings);

    this.rollerService.addToColourRange(this.title, genotypeToken.coatColour.geno as CoatColour);

    this.geno += `${i > 0 ? ' // ' : ''}
      ${genotypeToken.coatColour.genoText}+` +
      `${genotypeToken.markings ? genotypeToken.markings.map(value => value.genoText).join('/') : ''}` +
      `${genotypeToken.glintGene ? '/' + genotypeToken.glintGene.genoText + '-' + genotypeToken.glintColour.genoText : ''}`;
  }

  private getRarityGroup(reosOptions: ReosOption[]): Map<Rarity, ReosOption[]> {
    const map = Helpers.groupBy(reosOptions, item => item.rarity);
    return new Map([...map.entries()].sort((a, b) => a[0] - b[0]));
  }

  private validateCoatColour(colours: GenoToken[]) {
    colours
      .filter(value => value != null)
      .forEach(value => {
        const foundCoatColour = COAT_COLOUR_WHEEL.find(marking => marking.colourSymbol == value.genoText);
        if (!foundCoatColour) {
          value.valid = false;
          value.genoText = `<<${value.genoText}>>`;
          this.genoError = true;
        } else {
          value.geno = foundCoatColour;
        }
      });
  }

  private validateMarkings(markings: GenoToken[]) {
    markings
      .filter(value => value != null)
      .forEach(value => {
        const foundMarking = MARKINGS.find(marking => marking.recessiveSymbol == value.genoText
          || marking.dominateSymbol == value.genoText);
        if (!foundMarking) {
          value.valid = false;
          value.genoText = `<<${value.genoText}>>`;
          this.genoError = true;
        } else {
          value.geno = foundMarking;
        }
      });

  }
}
