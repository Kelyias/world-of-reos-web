import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClipboardService} from 'ngx-clipboard';
import {RollReoseanResponse} from '../../../../common-models/rest/roll-reosean-response';
import {RollerService} from '../services/roller.service';
import {ReoseanStringHelpers} from '../utils/reosean-string-helpers';

@Component({
  selector: 'app-litter',
  templateUrl: './litter.component.html',
  styleUrls: ['./litter.component.scss']
})
export class LitterComponent implements OnInit {

  @Output() trigger = new EventEmitter();
  litterText = '';

  constructor(private clipboardService: ClipboardService, private rollerService: RollerService) {
    this.rollerService.$restForm.subscribe(() => {
      this.litterText = '';
    });
  }

  ngOnInit() {
  }

  public setLitterText(text: string) {
    this.litterText = text;
  }

  triggerRoll() {
    this.trigger.emit();
  }

  copyToClipboard() {
    this.clipboardService.copyFromContent(this.litterText);
  }

  displayResults(response: RollReoseanResponse) {
    let text = '';

    response.offspring.map(child => ReoseanStringHelpers.reoseanToString(child))
      .forEach((childText, i) => text += `${i + 1}) ` + childText + '\n');

    text += '\n' + response.additionalFeedback;

    this.setLitterText(text);
  }

}
