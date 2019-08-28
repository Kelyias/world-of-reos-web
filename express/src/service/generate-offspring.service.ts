import {Offspring} from "../model/offspring";
import {RollReoseanRequest} from "../../../common-models/rest/roll-reosean-request";
import {RollReoseanResponse} from "../../../common-models/rest/roll-reosean-response";

export class GenerateOffspringService {
    public getOffspring(request: RollReoseanRequest): RollReoseanResponse{
        return new RollReoseanResponse();
    }
}
