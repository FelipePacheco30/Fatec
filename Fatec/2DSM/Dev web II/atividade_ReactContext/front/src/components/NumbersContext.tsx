import { createContext, useState, ReactNode } from "react";

type NumbersContextType = {
  numbers: string[];
  setNumbers: (nums: string[]) => void;
};

export const NumbersContext = createContext<NumbersContextType>({
  numbers: [],
  setNumbers: () => {},
});

export function NumbersProvider({ children }: { children: ReactNode }) {
  const [numbers, setNumbers] = useState<string[]>([]);

  return (
    <NumbersContext.Provider value={{ numbers, setNumbers }}>
      {children}
    </NumbersContext.Provider>
  );
}
