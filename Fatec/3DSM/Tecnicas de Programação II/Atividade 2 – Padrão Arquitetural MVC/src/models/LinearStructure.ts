import { ILinearStructure } from "./interfaces/ILinearStructure";

export type TryAddItemResult = { ok: true } | { ok: false; error: string };

export abstract class LinearStructure<T> implements ILinearStructure<T> {
  private static createdStructures = 0;

  private readonly id: number;
  protected items: T[] = [];
  public readonly name: string;

  protected constructor(name: string) {
    this.name = name;
    LinearStructure.createdStructures += 1;
    this.id = LinearStructure.createdStructures;
  }

  public add(item: T): void {
    this.items.push(item);
  }

  public tryAddItem(item: unknown): TryAddItemResult {
    if (item === undefined) {
      return { ok: false, error: "Informe o campo 'item' no corpo da requisição." };
    }

    this.add(item as T);
    return { ok: true };
  }

  public abstract remove(): T | undefined;

  public abstract peek(): T | undefined;

  public getItems(): T[] {
    return [...this.items];
  }

  public getSize(): number {
    return this.items.length;
  }

  public clear(): void {
    this.items = [];
  }

  public getId(): number {
    return this.id;
  }

  public static getCreatedStructures(): number {
    return LinearStructure.createdStructures;
  }
}
