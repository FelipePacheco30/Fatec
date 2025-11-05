import React from "react";
import styled from "styled-components";
import { Container, Titulo } from "../styles/Estilos";
import { usePalpites } from "../context/PalpitesContext";
import { PalpiteCard } from "../components/PalpiteCard";

const ListaPalpites = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  width: 100%;
`;

const MensagemVazia = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${(props) => props.theme.text};
  opacity: 0.7;
  margin: 2rem 0;
`;

export const HistoricoPage: React.FC = () => {
  const { palpites } = usePalpites();

  return (
    <Container>
      <Titulo>Histórico de Sugestões</Titulo>

      {palpites.length === 0 ? (
        <MensagemVazia>Nenhum palpite gerado ainda.</MensagemVazia>
      ) : (
        <ListaPalpites>
          {palpites.map((palpite) => (
            <PalpiteCard key={palpite.id} palpite={palpite} />
          ))}
        </ListaPalpites>
      )}
    </Container>
  );
};
