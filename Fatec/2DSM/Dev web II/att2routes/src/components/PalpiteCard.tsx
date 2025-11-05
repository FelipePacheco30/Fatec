import React from "react";
import styled from "styled-components";
import { Palpite } from "../context/PalpitesContext";
import { NumerosDisplay } from "./NumerosDisplay";

interface PalpiteCardProps {
  palpite: Palpite;
}

const CardPalpite = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), ${(p) => p.theme.cardBackground});
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 12px;
  padding: 1.2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 8px 22px rgba(0,0,0,0.06);
`;

/* data/hora alinhada e com estilo discreto */
const DataHora = styled.p`
  font-size: 0.88rem;
  color: ${(props) => props.theme.text};
  opacity: 0.72;
  margin: 0;
  text-align: right;
  min-width: 150px;
`;

/* componente */
export const PalpiteCard: React.FC<PalpiteCardProps> = ({ palpite }) => {
  return (
    <CardPalpite>
      <div style={{ flex: 1 }}>
        <NumerosDisplay numeros={palpite.numeros} tamanho="pequeno" />
      </div>

      <DataHora>{palpite.dataHora}</DataHora>
    </CardPalpite>
  );
};
