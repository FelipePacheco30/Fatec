import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Palpite {
  id: string;
  numeros: number[];
  dataHora: string;
}

interface PalpitesContextType {
  palpites: Palpite[];
  adicionarPalpite: (numeros: number[]) => void;
  limparHistorico: () => void;
}

const PalpitesContext = createContext<PalpitesContextType | undefined>(
  undefined
);

export const usePalpites = () => {
  const context = useContext(PalpitesContext);
  if (!context) {
    throw new Error("usePalpites deve ser usado dentro de PalpitesProvider");
  }
  return context;
};

interface PalpitesProviderProps {
  children: ReactNode;
}

export const PalpitesProvider: React.FC<PalpitesProviderProps> = ({
  children,
}) => {
  const [palpites, setPalpites] = useState<Palpite[]>([]);

  // Carrega palpites do localStorage ao inicializar
  useEffect(() => {
    const palpitesSalvos = localStorage.getItem("palpites");
    if (palpitesSalvos) {
      try {
        setPalpites(JSON.parse(palpitesSalvos));
      } catch (error) {
        console.error("Erro ao carregar palpites do localStorage:", error);
      }
    }
  }, []);

  // Salva palpites no localStorage sempre que houver mudança
  useEffect(() => {
    localStorage.setItem("palpites", JSON.stringify(palpites));
  }, [palpites]);

  const adicionarPalpite = (numeros: number[]) => {
    const novoPalpite: Palpite = {
      id: Date.now().toString(),
      numeros,
      dataHora: new Date().toLocaleString("pt-BR"),
    };
    setPalpites((prev) => [novoPalpite, ...prev]);
  };

  const limparHistorico = () => {
    setPalpites([]);
    localStorage.removeItem("palpites");
  };

  return (
    <PalpitesContext.Provider
      value={{ palpites, adicionarPalpite, limparHistorico }}
    >
      {children}
    </PalpitesContext.Provider>
  );
};
