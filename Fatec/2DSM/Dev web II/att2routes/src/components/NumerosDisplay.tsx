import React from "react";
import styled, { keyframes } from "styled-components";
import { NumerosContainer, Numero } from "../styles/Estilos";

interface NumerosDisplayProps {
  numeros: number[];
  tamanho?: "normal" | "pequeno";
}

const pulse = keyframes`
  0% { box-shadow: 0 6px 18px rgba(0,0,0,0.12); }
  50% { box-shadow: 0 18px 36px rgba(0,0,0,0.18); transform: translateY(-4px); }
  100% { box-shadow: 0 6px 18px rgba(0,0,0,0.12); transform: translateY(0); }
`;

const NumeroPequeno = styled(Numero)`
  width: 54px;
  height: 54px;
  font-size: 1.15rem;
`;

/* versão especial para o último número gerado (efeito sutil) */
const NumeroDestaque = styled(Numero)`
  animation: ${pulse} 2.6s ease-in-out infinite;
  background: linear-gradient(135deg, rgba(255,255,255,0.05), ${(p) => p.theme.buttonBackground});
`;

/* componente reutilizável */
export const NumerosDisplay: React.FC<NumerosDisplayProps> = ({
  numeros,
  tamanho = "normal",
}) => {
  if (numeros.length === 0) return null;

  const ComponenteNumero = tamanho === "pequeno" ? NumeroPequeno : Numero;

  return (
    <NumerosContainer>
      {numeros.map((numero: number, index: number) => {
        // destaque no último número (opcional, apenas visual)
        const isLast = index === numeros.length - 1;
        if (isLast && tamanho !== "pequeno") {
          return (
            <NumeroDestaque key={index}>{numero}</NumeroDestaque>
          );
        }
        return <ComponenteNumero key={index}>{numero}</ComponenteNumero>;
      })}
    </NumerosContainer>
  );
};
