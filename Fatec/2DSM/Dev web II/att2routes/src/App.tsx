import { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { PalpitesProvider } from "./context/PalpitesContext";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { PalpitePage } from "./pages/PalpitePage";
import { HistoricoPage } from "./pages/HistoricoPage";

// Temas
const temas = {
  claro: {
    background: "#f7f3ff",        // roxo bem claro de fundo
    text: "#2d004d",              // roxo escuro para texto
    cardBackground: "#ede2ff",    // lilás suave
    border: "#d0b3ff",            // borda em tom lavanda
    buttonBackground: "#7b2cbf",  // roxo médio
    buttonText: "#ffffff",        // texto branco no botão
    buttonHover: "#5a189a",       // roxo mais escuro no hover
  },
  escuro: {
    background: "#1a0726",        // fundo roxo escuro
    text: "#f3e8ff",              // texto lilás claro
    cardBackground: "#2d0a45",    // card em tom intermediário
    border: "#6a1b9a",            // borda roxa vibrante
    buttonBackground: "#9d4edd",  // botão roxo médio
    buttonText: "#ffffff",        // texto branco
    buttonHover: "#7b2cbf",       // hover em roxo mais escuro
  },
};

// Context do tema
const ThemeContext = createContext<{
  tema: typeof temas.escuro;
  toggleTheme: () => void;
}>(null as any);

export const useTheme = () => useContext(ThemeContext);

// Estilos globais
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  #root {
    min-height: 100vh;
  }
`;

function App() {
  const [isDark, setIsDark] = useState(() => {
    const salvo = localStorage.getItem("theme");
    return salvo ? salvo === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const tema = isDark ? temas.escuro : temas.claro;

  return (
    <ThemeContext.Provider
      value={{ tema, toggleTheme: () => setIsDark(!isDark) }}
    >
      <StyledThemeProvider theme={tema}>
        <GlobalStyles />
        <PalpitesProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/palpite" element={<PalpitePage />} />
              <Route path="/historico" element={<HistoricoPage />} />
            </Routes>
          </BrowserRouter>
        </PalpitesProvider>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
