import styled, { createGlobalStyle, ThemeProvider, DefaultTheme } from "styled-components";
import Ball from "../components/Ball";
import useLottery from "../hooks/useLottery";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { useState } from "react";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    border: string;
  }
}

const lightTheme: DefaultTheme = {
  background: "#F5F5F5",
  text: "#000",
  border: "#888",
};

const darkTheme: DefaultTheme = {
  background: "#222",
  text: "#FFF",
  border: "#BBB",
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-family: sans-serif;
  }
`;

export default function Megasena() {
  const { megasena, getConcurso } = useLottery();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [inputValue, setInputValue] = useState("");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const numero = parseInt(inputValue, 10);
      if (!isNaN(numero)) {
        getConcurso(numero);
      }
    }
  };
console.log("mega", megasena)
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <InputContainer>
        <ConcursoInput
          type="number"
          placeholder="Número do concurso"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </InputContainer>

      {megasena ? (
        "message" in megasena?(
          <LoadingSld>{megasena.message}</LoadingSld>
        ):
        (<WrapperSld>
          <TitleSld>MEGA-SENA - Concurso {megasena.concurso}</TitleSld>
          <BallsSld>
            <Ball>{megasena.bola1}</Ball>
            <Ball>{megasena.bola2}</Ball>
            <Ball>{megasena.bola3}</Ball>
            <Ball>{megasena.bola4}</Ball>
            <Ball>{megasena.bola5}</Ball>
            <Ball>{megasena.bola6}</Ball>
          </BallsSld>
          <DateSld>{formatarDataPorExtenso(megasena.data_do_sorteio)}</DateSld>
        </WrapperSld>)
      ) : (
        <LoadingSld>Carregando...</LoadingSld>
      )}
      <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

const InputContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
`;

const ConcursoInput = styled.input`
  padding: 8px 12px;
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const WrapperSld = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 20px;
  gap: 15px;
  margin-top: 80px; // para evitar sobreposição com o input
`;

const BallsSld = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const TitleSld = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const DateSld = styled.div`
  display: flex;
  justify-content: center;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
`;

const LoadingSld = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 50px;
`;

// Função utilitária
function formatarDataPorExtenso(dataISO: string): string {
  const data = new Date(dataISO);

  const opcoes: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dataFormatada = data.toLocaleDateString("pt-BR", opcoes);
  return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
}
