import { ListStructure } from "./ListStructure";
import { Queue } from "./Queue";
import { Stack } from "./Stack";

export const stack = new Stack<unknown>("Pilha Principal");
export const queue = new Queue<unknown>("Fila Principal");
export const list = new ListStructure<unknown>("Lista Principal");
