import { ErrorProps, MegaProps } from "../types";
import api from "./api";

export async function getLast(): Promise<MegaProps> {
  // espera 2 segundos antes de prosseguir
  await delay(500);
  const { data } = await api.get("/");
  return data;
}

export async function get(concurso:number): Promise<MegaProps | ErrorProps> {
  // espera 2 segundos antes de prosseguir
  await delay(500);
  const { data } = await api.get(`/${concurso}`);
  return data;
}

// Função para criar um delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
