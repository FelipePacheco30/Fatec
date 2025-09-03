import type { CSSProperties } from 'react';
import Input from './components/Input';
import Display from './components/Display';
import { NumbersProvider } from './components/NumbersContext';
export default function App() {
  return (
    <NumbersProvider> {}
      <div style={containerSld}>
        <Input />
        <Display />
      </div>
    </NumbersProvider>
  );
}

const containerSld: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #fff",
  padding: "20px",
  borderRadius: "10px",
  width: "600px",
  gap: "20px",
};
