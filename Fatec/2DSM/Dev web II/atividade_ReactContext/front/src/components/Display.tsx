import type { CSSProperties } from "react";
import { useContext } from "react";
import { NumbersContext } from "./NumbersContext";
import Ball from "./Ball";

export default function Display() {
  const { numbers } = useContext(NumbersContext); 

  if (numbers.length === 0) {
    return <div style={msgSld}>Sem entrada</div>;
  }

  return (
    <div style={displaySld}>
      {numbers.map((num, i) => (
        <Ball key={i} value={num} />
      ))}
    </div>
  );
}

const displaySld: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  flexWrap: "wrap",
  padding: "15px",
  border: "1px solid white",
  borderRadius: "10px"
};

const msgSld: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "31px",
  border: "1px solid white",
  borderRadius: "10px",
  fontStyle: "italic",
  color: "#791e85ff",
};
