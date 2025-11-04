import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

/* animação sutil para os cards */
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
  margin-top: 2.2rem;
  width: 100%;
  max-width: 920px;
  justify-items: center;
`;

const NavCard = styled.div`
  background: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 14px;
  padding: 1.4rem 1.2rem;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  min-width: 160px;
  text-align: center;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);

  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 18px 36px rgba(0,0,0,0.14);
    animation: ${float} 1.4s ease-in-out;
  }
`;

const NavCardTitulo = styled.h3`
  font-size: 1.05rem;
  margin: 0;
  color: ${(props) => props.theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavCardDescricao = styled.p`
  font-size: 0.9rem;
  margin: 0;
  color: ${(props) => props.theme.text};
  opacity: 0.78;
`;

/* componente */
export const NavigationCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CardsContainer>
      <NavCard onClick={() => navigate("/palpite")}>
        <NavCardTitulo>🎲 Palpite</NavCardTitulo>
        <NavCardDescricao>Gerar nova sugestão com um clique</NavCardDescricao>
      </NavCard>

      <NavCard onClick={() => navigate("/historico")}>
        <NavCardTitulo>📋 Histórico</NavCardTitulo>
        <NavCardDescricao>Ver palpites anteriores salvos</NavCardDescricao>
      </NavCard>
    </CardsContainer>
  );
};
