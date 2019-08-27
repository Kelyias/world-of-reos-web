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
import {COAT_COLOUR_WHEEL} from '../../../../common-models/coat-colour';
import {MARKINGS} from '../../../../common-models/marking';
import {GenotypeToken} from "../models/genotype-token";

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
  groupedEarTraitsOptionsByRarity: Map<Rarity, ReosOption>;
  groupedTailTraitOptionsByRarity: Map<Rarity, ReosOption>;
  groupedEyeTraitOptionsByRarity: Map<Rarity, ReosOption>;
  public geno: string;
  public genoError = false;
  public genotypeTokens: GenotypeToken[] = [];
  private genoRegexp = /(?<coatColour>[a-zA-Z]+)\+(?<markings>([a-zA-Z]+)+(\/[a-zA-Z]*)*)*(\/(?<glintGene>(Gl|GG))-(?<glintColour>[a-zA-Z]+))?$/;

  constructor(private fb: FormBuilder) {
  }

  keepOrder = (a, b) => a;

  ngOnInit() {

    this.reoseanForm = this.fb.group({
      species: ['', Validators.required],
      politicalStatus: ['', Validators.required],
      bodyType: ['', Validators.required],
      coatType: ['', Validators.required],
      eyeTrait: ['', Validators.required],
      tailTrait: ['', Validators.required],
      earTrait: ['', Validators.required],
      genoType: ['', Validators.required]
    });

    this.politicalStatusOptions = Helpers.convertEnumToOptionsArray(PoliticalStatus);
    this.speciesOptions = Helpers.convertEnumToOptionsArray(Species);
    this.coatTypeOptions = COAT_TYPES.map(value => Helpers.getReosOption(value.name, value.name));

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

  updateSpeciesOptions(species) {
    this.bodyTypeOptions = BODY_TYPES
      .filter(value => value.species == species)
      .map(value => Helpers.getReosOption(value.bodyType, value.bodyType));

    this.groupedEarTraitsOptionsByRarity = this.getRarityGroup(this.earTraits
      .filter(value => value.species == species)
      .map(value => Helpers.getReosOption(value.name, value.name, value.rarity)));

    this.groupedTailTraitOptionsByRarity = this.getRarityGroup(this.tailTrait
      .filter(value => value.species == species)
      .map(value => Helpers.getReosOption(value.name, value.name, value.rarity)));

    this.groupedEyeTraitOptionsByRarity = this.getRarityGroup(this.eyesTrait
      .filter(value => value.species == species)
      .map(value => Helpers.getReosOption(value.name, value.name, value.rarity)));


    this.reoseanForm.patchValue({
      bodyType: this.bodyTypeOptions[0].value,
      earTrait: this.groupedEarTraitsOptionsByRarity.values().next().value[0].value,
      tailTrait: this.groupedTailTraitOptionsByRarity.values().next().value[0].value,
      eyeTrait: this.groupedEyeTraitOptionsByRarity.values().next().value[0].value,
    });
  }

  validateGeno(genoText: string) {
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
      let genotypeToken = new GenotypeToken(value);
      this.genotypeTokens.push(genotypeToken);

      const matchArray = value.match(this.genoRegexp);

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

      this.geno += `${i > 0 ? ' // ' : ''}
      ${genotypeToken.coatColour.genoText}+
      ${genotypeToken.markings ? genotypeToken.markings.map(value => value.genoText).join('/') : ''}
      ${genotypeToken.glintGene ? '/' + genotypeToken.glintGene.genoText + '-' + genotypeToken.glintColour.genoText : ''}`;

    });
    console.log(this.genotypeTokens);
    this.reoseanForm.patchValue({genoType: genoText});
  }

  private getRarityGroup(reosOptions: ReosOption[]) {
    const map = Helpers.groupBy(reosOptions, item => item.rarity);
    return new Map([...map.entries()].sort((a, b) => a[0] - b[0]));
  }

  private validateCoatColour(colours: GenoToken[]) {
    colours
      .filter(value => value != null)
      .forEach(value => {
        let foundCoatColour = COAT_COLOUR_WHEEL.find(marking => marking.colourSymbol == value.genoText);
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
        let foundMarking = MARKINGS.find(marking => marking.recessiveSymbol == value.genoText
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
