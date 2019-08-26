import {ReosOption} from "../models/reos-option";

type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

export class Helpers {

  public static convertEnumToOptionsArray<E extends Enum<E>>(enumClass: E): ReosOption[] {
    return Object.keys(enumClass).map(key => {
      return {value: key, label: enumClass[key]};
    });
  }

  static getReosOption(key: string | number, label: string): ReosOption {
    return {value: key, label: label};
  }
}
