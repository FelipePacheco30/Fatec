import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";

interface Props {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function ThemeToggleButton({ theme, toggleTheme }: Props) {
  return (
    <Button onClick={toggleTheme} title="Alternar tema">
      {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </Button>
  );
}

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;
