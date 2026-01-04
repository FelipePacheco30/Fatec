import { ReactNode } from "react";

export interface LotteryContextProps {
  megasena: MegaProps | ErrorProps | undefined;
  getConcurso: (concurso:number) => void;
}

export interface MegaProps {
  concurso: number;
  data_do_sorteio: string;
  bola1: number;
  bola2: number;
  bola3: number;
  bola4: number;
  bola5: number;
  bola6: number;
  ganhadores_6_acertos: number;
  cidade_uf: string;
  rateio_6_acertos: string;
  ganhadores_5_acertos: number;
  rateio_5_acertos: string;
  ganhadores_4_acertos: number;
  rateio_4_acertos: string;
  acumulado_6_acertos: string;
  arrecadacao_total: string;
  estimativa_premio: string;
  acumulado_sorteio_especial_mega_da_virada: string;
  observacao: string;
}

export interface ErrorProps {
  message: string;
}

export interface ProviderProps {
  children: ReactNode;
}
