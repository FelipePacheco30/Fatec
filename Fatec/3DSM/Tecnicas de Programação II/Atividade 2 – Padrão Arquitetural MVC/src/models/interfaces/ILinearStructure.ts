export interface ILinearStructure<T> {
  readonly name: string;
  add(item: T): void;
  remove(): T | undefined;
  peek(): T | undefined;
  getItems(): T[];
  getSize(): number;
  clear(): void;
  getId(): number;
}
