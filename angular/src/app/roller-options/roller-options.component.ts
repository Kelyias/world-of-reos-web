import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-roller-options',
  templateUrl: './roller-options.component.html',
  styleUrls: ['./roller-options.component.scss']
})
export class RollerOptionsComponent implements OnInit {
  inbredChecked: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  public getInbred(): boolean {
    return this.inbredChecked;
  }

}
