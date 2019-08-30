import {ReosOption} from "../models/reos-option";
import {isNumeric} from "rxjs/internal-compatibility";
import {Rarity} from "../../../../common-models/rarity";

type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

export class Helpers {

  public static convertEnumToOptionsArray<E extends Enum<E>>(enumClass: E): ReosOption[] {
    return Object.keys(enumClass)
      .filter(key => !isNumeric(key))
      .map(key => {
        return {value: enumClass[key], label: key};
    });
  }

  public static getReosOption(value: any, label: any, rarity?: Rarity): ReosOption {
    return {value: value, label: label, rarity: rarity};
  }

  public static groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  public static toTitleCase(text: string): string {
    return text.toLocaleLowerCase().replace(/\b\w/g, first => first.toLocaleUpperCase())
  }
}
