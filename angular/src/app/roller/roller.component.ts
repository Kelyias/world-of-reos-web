import {Component, OnInit, ViewChild} from '@angular/core';
import {ParentBlockComponent} from "../parent-block/parent-block.component";
import {LitterComponent} from "../litter/litter.component";

@Component({
  selector: 'app-roller',
  templateUrl: './roller.component.html',
  styleUrls: ['./roller.component.scss']
})
export class RollerComponent implements OnInit {

  @ViewChild('sireParent', {static: false}) sireParent: ParentBlockComponent;
  @ViewChild('dameParent', {static: false}) dameParent: ParentBlockComponent;
  @ViewChild('litterBlock', {static: false}) litterBlock: LitterComponent;

  constructor() {
  }

  ngOnInit() {
  }

  roll() {
    if(this.sireParent.isValid() && this.dameParent.isValid()){
      console.log(this.sireParent.getReosean());
      console.log(this.dameParent.getReosean());
      this.litterBlock.setLitterText("BITCH I AIN'T READY YET!");
    }
  }
}
