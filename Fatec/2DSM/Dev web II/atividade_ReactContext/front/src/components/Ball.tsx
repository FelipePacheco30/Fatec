import type { CSSProperties } from "react";

type BallProps = {
  value: string;
};

export default function Ball({ value }: BallProps) {
  return <div style={ballSld}>{value}</div>;
}

const ballSld: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "#791e85ff",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
};
