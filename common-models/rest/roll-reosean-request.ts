import {Reosean} from "../reosean";
import {Supplement} from "../supplement";

export class RollReoseanRequest {
    sire: Reosean;
    dam: Reosean;
    supplements: Supplement[];
    inbred: boolean;
    inbredReason?: string;
    rollerId: string;
}
