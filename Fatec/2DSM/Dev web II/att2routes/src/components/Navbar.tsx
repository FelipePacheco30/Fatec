import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Sun, Moon, Dice6, History } from "lucide-react";
import { useTheme } from "../App";

/* Navbar com glass + leve elevação e layout mais moderno */
const Nav = styled.nav`
  position: fixed;
  top: 12px;
  left: 12px;
  right: 12px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.6rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1100;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
`;

/* Grupo esquerdo (logo + título) */
const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  cursor: pointer;
`;

/* Logo circular */
const Logo = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${(p) => `linear-gradient(135deg, ${p.theme.buttonBackground}, ${p.theme.buttonHover})`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.buttonText};
  font-weight: 800;
  font-size: 0.95rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.18);
`;

/* Título clicável */
const NavTitle = styled.h2`
  font-size: 1.05rem;
  margin: 0;
  color: ${(props) => props.theme.text};
  letter-spacing: 0.6px;
`;

/* Right group com botões */
const NavLinks = styled.div`
  display: flex;
  gap: 0.65rem;
  align-items: center;
`;

/* Estilo dos "links" como botões com ícones */
const NavLink = styled.button<{ $active?: boolean }>`
  background: ${(props) =>
    props.$active
      ? `linear-gradient(180deg, ${props.theme.buttonBackground}, ${props.theme.buttonHover})`
      : "transparent"};
  border: ${(props) => (props.$active ? "none" : `1px solid ${props.theme.border}`)};
  color: ${(props) => (props.$active ? props.theme.buttonText : props.theme.text)};
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.45rem 0.7rem;
  border-radius: 10px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgba(0,0,0,0.12);
  }
`;

/* Toggle de tema em "toggle pill" */
const ThemeToggle = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};
  border-radius: 999px;
  padding: 0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 42px;
  height: 36px;
  transition: transform 0.14s ease, background 0.14s ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,0.02);
  }
`;

/* Componente */
export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme, tema } = useTheme();

  const isDark = tema.background === "#1a1a1a";
  const iconColor = tema.text;

  return (
    <Nav>
      <LeftGroup onClick={() => navigate("/")}>
        <Logo>MS</Logo>
        <NavTitle>Mega-Sena</NavTitle>
      </LeftGroup>

      <NavLinks>
        <NavLink
          onClick={() => navigate("/palpite")}
          $active={location.pathname === "/palpite"}
          title="Palpite"
        >
          <Dice6 size={16} />
          Palpite
        </NavLink>

        <NavLink
          onClick={() => navigate("/historico")}
          $active={location.pathname === "/historico"}
          title="Histórico"
        >
          <History size={16} />
          Histórico
        </NavLink>
      </NavLinks>
    </Nav>
  );
};
