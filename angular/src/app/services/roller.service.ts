import {Injectable} from '@angular/core';
import {CoatColour} from '../../../../common-models/coat-colour';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RollerService {

  private errorFeedback: string[] = [];

  private colourRangeByParent: Map<string, CoatColour[]> = new Map<string, CoatColour[]>();
  private colourRange: BehaviorSubject<Map<string, CoatColour[]>> = new BehaviorSubject<Map<string, CoatColour[]>>(this.colourRangeByParent);
  public $colourRange: Observable<Map<string, CoatColour[]>> = this.colourRange.asObservable();

  private restForm: Subject<void> = new Subject<void>();
  public $restForm: Observable<void> = this.restForm.asObservable();

  constructor() {
  }

  resetFeedback() {
    this.errorFeedback = [];
  }

  getErrorFeedback() {
    return this.errorFeedback.join('\n');
  }

  addFeedback(s: string) {
    this.errorFeedback.push(s);
  }

  addToColourRange(parent: string, coatColour: CoatColour) {
    this.colourRangeByParent.get(parent).push(coatColour);
    this.colourRange.next(this.colourRangeByParent);
  }

  resetColourRange(parent: string) {
    this.colourRangeByParent.set(parent, []);
  }

  resetAll() {
    this.restForm.next();
  }
}
