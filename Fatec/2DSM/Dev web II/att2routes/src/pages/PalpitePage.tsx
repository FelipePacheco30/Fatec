import React, { useEffect, useState } from "react";
import { Container, Card, Titulo, Botao } from "../styles/Estilos";
import { usePalpites } from "../context/PalpitesContext";
import { gerarPalpite } from "../utils/gerarPalpite";
import { NumerosDisplay } from "../components/NumerosDisplay";

export const PalpitePage: React.FC = () => {
  const { adicionarPalpite } = usePalpites();
  const [numeros, setNumeros] = useState<number[]>([]);

  // Gera palpite automaticamente ao carregar a página
  useEffect(() => {
    const novoPalpite = gerarPalpite();
    setNumeros(novoPalpite);
    adicionarPalpite(novoPalpite);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNovaSugestao = () => {
    const novoPalpite = gerarPalpite();
    setNumeros(novoPalpite);
    adicionarPalpite(novoPalpite);
  };

  return (
    <Container>
      <Card>
        <Titulo>Sugestão de Aposta</Titulo>

        <NumerosDisplay numeros={numeros} />

        <Botao onClick={handleNovaSugestao}>Nova sugestão</Botao>
      </Card>
    </Container>
  );
};
