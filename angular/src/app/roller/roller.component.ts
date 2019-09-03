import {Component, OnInit, ViewChild} from '@angular/core';
import {ParentBlockComponent} from '../parent-block/parent-block.component';
import {LitterComponent} from '../litter/litter.component';
import {SupplementsComponent} from '../supplements/supplements.component';
import {RollerOptionsComponent} from '../roller-options/roller-options.component';
import {RollReoseanRequest} from '../../../../common-models/rest/roll-reosean-request';
import {RollerApiService} from '../services/roller-api.service';
import {v4 as uuid} from 'uuid';
import {RollerService} from '../services/roller.service';

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
  private inProgress = false;

  constructor(private rollerApiService: RollerApiService, private rollerService: RollerService) {
    if (!localStorage.getItem('rollerId')) {
      localStorage.setItem('rollerId', uuid());
    }
  }

  ngOnInit() {
  }

  roll() {
    if (this.inProgress) {
      return;
    }

    this.rollerService.resetFeedback();
    if (this.sireParent.isValid() && this.dameParent.isValid() && this.supplementsComponent.isValid()) {
      this.inProgress = true;
      this.litterBlock.setLitterText('Rolling!');
      const request: RollReoseanRequest = {
        dam: this.dameParent.getReosean(),
        sire: this.sireParent.getReosean(),
        supplements: this.supplementsComponent.getSupplements(),
        inbred: this.rollerOptionsComponent.getInbred(),
        inbredReason: this.rollerOptionsComponent.getInbredReason(),
        rollerId: localStorage.getItem('rollerId')
      };
      this.rollerApiService.rollReosean(request).subscribe(response => {
          setTimeout(() => this.inProgress = false, 1000);
          this.litterBlock.displayResults(response);
        },
        () => {
          this.inProgress = false;
          this.litterBlock.setLitterText('Error happened while rolling!');
        });
    } else {
      this.litterBlock.setLitterText(this.rollerService.getErrorFeedback());
    }
  }

  resetForm() {
    this.rollerService.resetAll();
  }
}
