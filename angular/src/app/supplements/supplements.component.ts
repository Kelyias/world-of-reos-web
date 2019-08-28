import {Component, OnInit} from '@angular/core';
import {Supplement, SUPPLEMENTS} from "../../../../common-models/supplement";
import {MdbCheckboxChange} from "ng-uikit-pro-standard";

@Component({
  selector: 'app-supplements',
  templateUrl: './supplements.component.html',
  styleUrls: ['./supplements.component.scss']
})
export class SupplementsComponent implements OnInit {

  public supplements = SUPPLEMENTS;
  private toggledSupplements = [];

  constructor() {
  }

  ngOnInit() {
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
}
