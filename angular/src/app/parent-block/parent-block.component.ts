import {Component, OnInit} from '@angular/core';
import {PoliticalStatus} from "../../../../common-models/political-status";
import {Helpers} from "../utils/helpers";
import {ReosOption} from "../models/reos-option";
import {Species} from "../../../../common-models/species";
import {BODY_TYPES} from "../../../../common-models/body";
import {COAT_TYPES} from "../../../../common-models/coat-type";
import {Trait, TRAITS} from "../../../../common-models/trait";
import {TraitType} from "../../../../common-models/trait-type";

@Component({
  selector: 'app-parent-block',
  templateUrl: './parent-block.component.html',
  styleUrls: ['./parent-block.component.scss']
})
export class ParentBlockComponent implements OnInit {
  politicalStatusOptions: Array<ReosOption> = Helpers.convertEnumToOptionsArray(PoliticalStatus);
  speciesOptions: Array<ReosOption>;
  coatTypeOptions: Array<ReosOption>;
  earTraitsOptions: Array<Trait>;
  tailTraitOptions: Array<Trait>;
  eyeTraitOptions: Array<ReosOption>;

  filteredBodyTypeOptions: Array<ReosOption>;
  filteredEarTraitsOptions: Array<ReosOption>;
  filteredTailTraitOptions: Array<ReosOption>;

  constructor() {
  }

  ngOnInit() {
    this.politicalStatusOptions = Helpers.convertEnumToOptionsArray(PoliticalStatus);
    this.speciesOptions = Helpers.convertEnumToOptionsArray(Species);
    this.coatTypeOptions = COAT_TYPES.map(value => Helpers.getReosOption(value.name, value.name));
    this.earTraitsOptions = TRAITS.filter(value => value.type == TraitType.EAR);
    this.tailTraitOptions = TRAITS.filter(value => value.type == TraitType.TAIL);
    this.eyeTraitOptions = TRAITS.filter(value => value.type == TraitType.EYE).map(value => Helpers.getReosOption(value.name, value.name));
    this.updateSpecies(this.speciesOptions[0].value);
  }

  updateSpecies(species) {
    console.log('species:', species);
    this.filteredBodyTypeOptions = BODY_TYPES
      .filter(value => value.species == species)
      .map(value => Helpers.getReosOption(value.bodyType, value.bodyType));

    this.filteredEarTraitsOptions = this.earTraitsOptions
      .filter(value => value.species == species)
      .map(value => Helpers.getReosOption(value.name, value.name));

    this.filteredTailTraitOptions = this.tailTraitOptions
      .filter(value => value.species == species)
      .map(value => Helpers.getReosOption(value.name, value.name));
  }
}
