import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-roller-options',
  templateUrl: './roller-options.component.html',
  styleUrls: ['./roller-options.component.scss']
})
export class RollerOptionsComponent implements OnInit {
  inbredChecked: boolean = false;
  inbredReason: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  public getInbred(): boolean {
    return this.inbredChecked;
  }

  public getInbredReason(): string {
    return this.inbredReason;
  }

}
