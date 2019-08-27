import {ReosOption} from "../models/reos-option";
import {isNumeric} from "rxjs/internal-compatibility";

type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

export class Helpers {

  public static convertEnumToOptionsArray<E extends Enum<E>>(enumClass: E): ReosOption[] {
    return Object.keys(enumClass)
      .filter(key => !isNumeric(key))
      .map(key => {
        return {value: enumClass[key], label: key};
    });
  }

  static getReosOption(key: string | number, label: any): ReosOption {
    return {value: key, label: label};
  }
}
