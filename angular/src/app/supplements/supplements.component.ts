import {Component, OnInit} from '@angular/core';
import {Supplement, SupplementRule, SUPPLEMENTS} from '../../../../common-models/supplement';
import {MdbCheckboxChange} from 'ng-uikit-pro-standard';
import {COAT_COLOUR_WHEEL, CoatColour} from '../../../../common-models/coat-colour';
import {BODY_TYPES, BodyType} from '../../../../common-models/body';
import {Species} from '../../../../common-models/species';
import {Helpers} from "../utils/helpers";

@Component({
  selector: 'app-supplements',
  templateUrl: './supplements.component.html',
  styleUrls: ['./supplements.component.scss']
})
export class SupplementsComponent implements OnInit {

  public supplements = SUPPLEMENTS;
  public rules = SupplementRule;
  public supplementTargetCoatColour: CoatColour;
  public supplementTargetBodyType: BodyType;
  public supplementTargetGlintColour: CoatColour;
  public coatColourOptions;
  public bodyTypeOptions;
  private toggledSupplements = [];

  constructor() {
  }

  ngOnInit() {
    this.coatColourOptions = COAT_COLOUR_WHEEL.map(value => {
      return {
        label: value.colourName,
        value,
        icon: ''
      };
    });
    this.bodyTypeOptions = BODY_TYPES
      .filter(value => value.species == Species.VAYRON)
      .map(value => {
        return {
          label: Helpers.toTitleCase(value.type),
          value,
          icon: ''
        };
      });

  }

  toggleSupplement(event: MdbCheckboxChange, index: number) {
    if (event.checked) {
      this.toggledSupplements.push(index);
    } else {
      this.toggledSupplements = this.toggledSupplements.filter(value => value != index);
    }
  }

  public getSupplements(): Supplement[] {
    return this.toggledSupplements.map(value => {
      const supplement = this.supplements[value];
      this.applyTarget(supplement);
      return supplement;
    });
  }

  public isValid(): boolean {
    return this.testSupplements(this.getSupplements());
  }

  public isSupplementToggled(index: number): boolean {
    return this.toggledSupplements.findIndex(value => value == index) >= 0;
  }

  private applyTarget(supplement: Supplement) {
    switch (supplement.rule) {
      case SupplementRule.TARGET_BODY_TYPE:
        supplement.target = this.supplementTargetBodyType;
        break;
      case SupplementRule.TARGET_COAT_COLOUR:
        supplement.target = this.supplementTargetCoatColour;
        break;
      case SupplementRule.TARGET_GLINT:
        supplement.target = this.supplementTargetGlintColour;
        break;
    }
  }

  private testSupplements(testSupplements: Supplement[]): boolean {
    let supplementRules = testSupplements.map(value => value.rule);
    let valid = true;
    if (supplementRules.indexOf(SupplementRule.ALL_FEMALE) >= 0 && supplementRules.indexOf(SupplementRule.ALL_MALE) >= 0) {
      valid = false;
    }
    testSupplements.forEach(value => {
      switch (value.rule) {
        case SupplementRule.TARGET_BODY_TYPE:
          if (!value.target) valid = false;
          break;
        case SupplementRule.TARGET_COAT_COLOUR:
          if (!value.target) valid = false;
          break;
        case SupplementRule.TARGET_GLINT:
          if (!value.target) valid = false;
          break;
      }
    });

    return valid;
  }
}

