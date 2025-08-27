
import { useState } from "react";
import useUser from "../hooks/useUser";

export default function Form() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const { add } = useUser();

  return (
    <div>
        <div>
      <label htmlFor="nome">Nome</label>
      <input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div>
      <label htmlFor="idade">Idade</label>
      <input id="idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
      </div>
      <button onClick={() => add({name:nome, age:idade})}>Salvar</button>
    </div>
  );
}
