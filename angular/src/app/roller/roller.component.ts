import {Component, OnInit, ViewChild} from '@angular/core';
import {ParentBlockComponent} from '../parent-block/parent-block.component';
import {LitterComponent} from '../litter/litter.component';
import {SupplementsComponent} from '../supplements/supplements.component';
import {RollerOptionsComponent} from '../roller-options/roller-options.component';
import {RollReoseanRequest} from '../../../../common-models/rest/roll-reosean-request';
import {RollerService} from '../services/roller.service';
import {response} from "express";

@Component({
  selector: 'app-roller',
  templateUrl: './roller.component.html',
  styleUrls: ['./roller.component.scss']
})
export class RollerComponent implements OnInit {

  @ViewChild('sireParent', {static: false}) sireParent: ParentBlockComponent;
  @ViewChild('dameParent', {static: false}) dameParent: ParentBlockComponent;
  @ViewChild('litterBlock', {static: false}) litterBlock: LitterComponent;
  @ViewChild('supplementsComponent', {static: false}) supplementsComponent: SupplementsComponent;
  @ViewChild('rollerOptionsComponent', {static: false}) rollerOptionsComponent: RollerOptionsComponent;

  constructor(private rollerService: RollerService) {
  }

  ngOnInit() {
  }

  roll() {
    if (this.sireParent.isValid() && this.dameParent.isValid()) {

      const request: RollReoseanRequest = {
        dam: this.dameParent.getReosean(),
        sire: this.sireParent.getReosean(),
        supplements: this.supplementsComponent.getSupplements(),
        inbred: this.rollerOptionsComponent.getInbred(),
      };
      this.rollerService.rollReosean(request).subscribe(response => console.log(response));
    }
  }
}
