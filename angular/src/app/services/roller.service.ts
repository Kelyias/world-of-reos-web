import {Injectable} from '@angular/core';
import {RollReoseanRequest} from "../../../../common-models/rest/roll-reosean-request";
import {Observable} from "rxjs";
import {RollReoseanResponse} from "../../../../common-models/rest/roll-reosean-response";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RollerService {

  private rollUrl = '/api/roll';

  constructor(private http: HttpClient) {
  }

  public rollReosean(request: RollReoseanRequest): Observable<RollReoseanResponse> {
    return this.http.post<RollReoseanResponse>(this.rollUrl, request);
  }
}
