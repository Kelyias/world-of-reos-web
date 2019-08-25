import {Offspring} from "../model/offspring";

export class GenerateOffspringService {
    public getOffspring(): Offspring{
        return new Offspring("frank");
    }
}
