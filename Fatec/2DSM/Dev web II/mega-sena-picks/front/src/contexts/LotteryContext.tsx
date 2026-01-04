import { createContext, useEffect, useState } from "react";
import {
  ErrorProps,
  LotteryContextProps,
  MegaProps,
  ProviderProps,
} from "../types";
import { getLast, get } from "../services/Lottery";

export const LotteryContext = createContext({} as LotteryContextProps);

export function LotteryProvider({ children }: ProviderProps) {
  const [megasena, setMegasena] = useState<
    MegaProps | ErrorProps | undefined
  >();

  useEffect(() => {
    (async function () {
      const result = await getLast();
      setMegasena(result);
    })();
  }, []);

  async function getConcurso(concurso: number) {
    setMegasena(undefined);
    const result = await get(concurso);
    setMegasena(result);
  }

  return (
    <LotteryContext.Provider value={{ megasena, getConcurso }}>
      {children}
    </LotteryContext.Provider>
  );
}
