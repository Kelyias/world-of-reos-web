import {Component, OnInit} from '@angular/core';
import {Supplement, SupplementRule, SUPPLEMENTS} from "../../../../common-models/supplement";
import {MdbCheckboxChange} from "ng-uikit-pro-standard";
import {COAT_COLOUR_WHEEL, CoatColour} from "../../../../common-models/coat-colour";
import {BODY_TYPES, BodyType} from "../../../../common-models/body";
import {Species} from "../../../../common-models/species";

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
        value: value,
        icon: ''
      };
    });
    this.bodyTypeOptions = BODY_TYPES
      .filter(value => value.species == Species.VAYRON)
      .map(value => {
        return {
          label: value.type,
          value: value,
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
    return this.toggledSupplements.map(value => this.supplements[value]);
  }

  public isSupplementToggled(index: number): boolean {
    return this.toggledSupplements.findIndex(value => value == index) >= 0;
  }
}

