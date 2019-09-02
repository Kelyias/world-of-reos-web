import {Component, OnInit} from '@angular/core';
import {RollerService} from '../services/roller.service';

@Component({
  selector: 'app-roller-options',
  templateUrl: './roller-options.component.html',
  styleUrls: ['./roller-options.component.scss']
})
export class RollerOptionsComponent implements OnInit {
  inbredChecked = false;
  inbredReason = '';

  constructor(private rollerService: RollerService) {

    this.rollerService.$restForm.subscribe(() => {
      this.inbredChecked = false;
      this.inbredReason = '';
    });
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
