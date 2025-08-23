import { useState } from "react";

export default function Entrada() {
  const [nome, setNome] = useState("");
  //const [lista, setLista] = useState([] as string[]);
  const [lista, setLista] = useState<string[]>([]);

  function salvar(){
    setLista([...lista, nome]);
  }

  return (
    <div>
      <div>Nome: {nome}</div>
      <input value={nome} onChange={(e) => setNome(e.target.value)} />
      <button onClick={salvar}>Salvar</button>
      <ol>
        {
            lista.map(function(item, indice){
                return <li key={indice}>{item}</li>
            })
        }
      </ol>
    </div>
  )}