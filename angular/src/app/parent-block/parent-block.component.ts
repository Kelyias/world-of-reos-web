import {Component, OnInit} from '@angular/core';
import {PoliticalStatus} from "../../../../common-models/political-status";
import {Helpers} from "../utils/helpers";
import {ReosOption} from "../models/reos-option";
import {Species} from "../../../../common-models/species";
import {BODY_TYPES} from "../../../../common-models/body";
import {COAT_TYPES} from "../../../../common-models/coat-type";
import {Trait, TRAITS} from "../../../../common-models/trait";
import {TraitType} from "../../../../common-models/trait-type";
import {Rarity} from "../../../../common-models/rarity";

@Component({
  selector: 'app-parent-block',
  templateUrl: './parent-block.component.html',
  styleUrls: ['./parent-block.component.scss']
})
export class ParentBlockComponent implements OnInit {
  politicalStatusOptions: Array<ReosOption> = Helpers.convertEnumToOptionsArray(PoliticalStatus);
  speciesOptions: Array<ReosOption>;
  coatTypeOptions: Array<ReosOption>;
  earTraits: Array<Trait>;
  tailTrait: Array<Trait>;
  groupedEyeTraitOptionsByRarity: Map<Rarity, ReosOption>;

  bodyTypeOptions: Array<ReosOption>;
  groupedEarTraitsOptionsByRarity: Map<Rarity, ReosOption>;
  groupedTailTraitOptionsByRarity: Map<Rarity, ReosOption>;

  constructor() {
  }

  ngOnInit() {
    this.politicalStatusOptions = Helpers.convertEnumToOptionsArray(PoliticalStatus);
    this.speciesOptions = Helpers.convertEnumToOptionsArray(Species);
    this.coatTypeOptions = COAT_TYPES.map(value => Helpers.getReosOption(value.name, value.name));
    this.earTraits = TRAITS.filter(value => value.type == TraitType.EAR);
    this.tailTrait = TRAITS.filter(value => value.type == TraitType.TAIL);
    this.groupedEyeTraitOptionsByRarity = this.getRarityGroup(TRAITS
      .filter(value => value.type == TraitType.EYE)
      .map(value => Helpers.getReosOption(value.name, value.name, value.rarity)));
    this.updateSpeciesOptions(this.speciesOptions[0].value);
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
  }

  private getRarityGroup(reosOptions: ReosOption[]) {
    return Helpers.groupBy(reosOptions, item => item.rarity);
  }
}
