import type { CSSProperties } from 'react';
import { useContext, useState } from "react";
import { NumbersContext } from './NumbersContext';

export default function Input() {
  const [value, setValue] = useState("");
  const { setNumbers } = useContext(NumbersContext); 
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setValue(inputValue);

    const nums = inputValue
      .trim()
      .split(" ")
      .filter(n => n !== "")
      .slice(0, 6);

    setNumbers(nums);
  }

  return (
    <input
      style={inputSld}
      value={value}
      onChange={handleChange}
      placeholder="Digite números separados por espaço"
    />
  );
}

const inputSld: CSSProperties = {
  display: "flex",
  padding: "20px",
  borderRadius: "10px"
};
