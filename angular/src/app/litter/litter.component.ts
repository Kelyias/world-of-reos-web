import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-litter',
  templateUrl: './litter.component.html',
  styleUrls: ['./litter.component.scss']
})
export class LitterComponent implements OnInit {

  @Output() trigger = new EventEmitter();
  litterText = '';

  constructor(private clipboardService: ClipboardService) {
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
}
