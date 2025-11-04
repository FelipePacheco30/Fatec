import styled from "styled-components";
import "styled-components";

// Declaração de tipos do tema
declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    cardBackground: string;
    border: string;
    buttonBackground: string;
    buttonText: string;
    buttonHover: string;
  }
}

/*
  Novo visual:
  - Fundo com gradiente suave
  - Cartões com vidro (glassmorphism) + borda sutil
  - Botões com efeito "neumorphism" / elevated
  - Tipografia maior e espaçamento mais arejado
*/

/* Utilitário: container principal */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 2rem;
  padding-top: 6.5rem; /* espaço para navbar fixa */
  text-align: center;

  /* fundo em gradiente suave que respeita o tema */
  background: linear-gradient(
    180deg,
    ${(p) => p.theme.background} 0%,
    rgba(255,255,255,0.02) 50%,
    ${(p) => p.theme.background} 100%
  );
`;

/* Card principal (central) com glassmorphism */
export const Card = styled.div`
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.02),
      rgba(255, 255, 255, 0.01)
    ),
    ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 2.2rem;
  max-width: 720px;
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  backdrop-filter: blur(6px);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  transform-origin: center;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0,0,0,0.18);
  }
`;

/* Título maior e com tracking */
export const Titulo = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 1.6rem;
  color: ${(props) => props.theme.text};
  letter-spacing: 0.6px;
  font-weight: 700;
`;

/* Botão com aparência elevada */
export const Botao = styled.button`
  background: ${(props) =>
    `linear-gradient(180deg, ${props.theme.buttonBackground}, ${props.theme.buttonHover})`};
  color: ${(props) => props.theme.buttonText};
  border: none;
  padding: 0.9rem 1.6rem;
  font-size: 1.05rem;
  border-radius: 12px;
  cursor: pointer;
  margin: 1rem;
  transition: transform 0.14s ease, box-shadow 0.14s ease;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 30px rgba(0,0,0,0.2);
    background: ${(props) => props.theme.buttonHover};
  }

  &:active {
    transform: translateY(-1px) scale(0.995);
  }
`;

/* Link estilizado para ações secundárias */
export const Link = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  font-size: 0.98rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0.5rem;
  margin-top: 1rem;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }
`;

/* Container de números (flex com gaps responsivos) */
export const NumerosContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1.8rem 0;
`;

/* Estilo principal para cada bola/número */
export const Numero = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(255,255,255,0.06), ${(p) => p.theme.buttonBackground});
  border: 2px solid rgba(255,255,255,0.06);
  color: ${(props) => props.theme.buttonText};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 800;
  box-shadow: 0 6px 16px rgba(0,0,0,0.14);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  /* efeito sutil quando hover (UX) */
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 18px 32px rgba(0,0,0,0.2);
  }

  /* versão responsiva */
  @media (max-width: 420px) {
    width: 56px;
    height: 56px;
    font-size: 1.2rem;
  }
`;
