import { LinearStructure } from "./LinearStructure";
import { list, queue, stack } from "./instances";

export interface ApplicationStatsPayload {
  totalEstruturasCriadas: number;
  estruturas: Array<{
    id: number;
    name: string;
    tamanho: number;
    tipo: "pilha" | "fila" | "lista";
  }>;
}

export function buildApplicationStats(): ApplicationStatsPayload {
  return {
    totalEstruturasCriadas: LinearStructure.getCreatedStructures(),
    estruturas: [
      {
        id: stack.getId(),
        name: stack.name,
        tamanho: stack.getSize(),
        tipo: "pilha",
      },
      {
        id: queue.getId(),
        name: queue.name,
        tamanho: queue.getSize(),
        tipo: "fila",
      },
      {
        id: list.getId(),
        name: list.name,
        tamanho: list.getSize(),
        tipo: "lista",
      },
    ],
  };
}
