import { LinearStructure } from "./LinearStructure";

export class ListStructure<T> extends LinearStructure<T> {
  public static parseIndex(value: string | string[] | undefined): number | undefined {
    const raw = Array.isArray(value) ? value[0] : value;
    if (raw === undefined) {
      return undefined;
    }

    const index = Number(raw);
    return Number.isNaN(index) ? undefined : index;
  }

  public constructor(name = "Lista") {
    super(name);
  }

  public remove(): T | undefined {
    return this.items.pop();
  }

  public peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  public getAt(index: number): T | undefined {
    if (index < 0 || index >= this.items.length) {
      return undefined;
    }

    return this.items[index];
  }

  public removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.items.length) {
      return undefined;
    }

    const [removed] = this.items.splice(index, 1);
    return removed;
  }
}
