import { Component, OnInit } from '@angular/core';
import {SUPPLEMENTS} from "../../../../common-models/supplement";

@Component({
  selector: 'app-supplements',
  templateUrl: './supplements.component.html',
  styleUrls: ['./supplements.component.scss']
})
export class SupplementsComponent implements OnInit {

  public supplements = SUPPLEMENTS;

  constructor() { }

  ngOnInit() {
  }

}
