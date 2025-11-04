import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Titulo, Botao } from "../styles/Estilos";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Titulo>Mega-Sena</Titulo>
      <p style={{ marginBottom: "2rem", fontSize: "1.2rem" }}>
        Gerador de Sugestões de Apostas
      </p>

      <Botao onClick={() => navigate("/palpite")}>Clique para começar</Botao>
    </Container>
  );
};
