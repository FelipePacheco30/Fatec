import { LinearStructure } from "./LinearStructure";

export class Stack<T> extends LinearStructure<T> {
  public constructor(name = "Pilha") {
    super(name);
  }

  public remove(): T | undefined {
    return this.items.pop();
  }

  public peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}
