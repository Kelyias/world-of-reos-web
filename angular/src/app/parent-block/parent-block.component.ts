import {Component, OnInit} from '@angular/core';
import {PoliticalStatus} from "../../../../common-models/political-status";
import {Helpers} from "../utils/helpers";
import {ReosOption} from "../models/reos-option";
import {Species} from "../../../../common-models/species";
import {BodyType} from "../../../../common-models/body-type";
import {COAT_TYPES} from "../../../../common-models/coat-type";
import {TRAITS} from "../../../../common-models/trait";
import {TraitType} from "../../../../common-models/trait-type";

@Component({
  selector: 'app-parent-block',
  templateUrl: './parent-block.component.html',
  styleUrls: ['./parent-block.component.scss']
})
export class ParentBlockComponent implements OnInit {
  politicalStatusOptions: Array<ReosOption> = Helpers.convertEnumToOptionsArray(PoliticalStatus);
  speciesOptions: Array<ReosOption> = Helpers.convertEnumToOptionsArray(Species);
  bodyTypeOptions: Array<ReosOption> = Helpers.convertEnumToOptionsArray(BodyType);
  coatTypeOptions: Array<ReosOption> = COAT_TYPES.map(value => Helpers.getReosOption(value.name,value.name));
  earTraitsOptions: Array<ReosOption> = TRAITS.filter(value => value.type == TraitType.EAR).map(value => Helpers.getReosOption(value.name,value.name));
  tailTraitOptions: Array<ReosOption> = TRAITS.filter(value => value.type == TraitType.TAIL).map(value => Helpers.getReosOption(value.name,value.name));
  eyeTraitOptions: Array<ReosOption> =  TRAITS.filter(value => value.type == TraitType.EYE).map(value => Helpers.getReosOption(value.name,value.name));

  constructor() {
  }

  ngOnInit() {
  }

}
