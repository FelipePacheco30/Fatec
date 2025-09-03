import type { CSSProperties } from 'react';
import Input from './components/input'
import Display from './components/Display'

export default function App() {

  return (
    <div style={containerSld}>
    <Input />
    <Display />
    </div>
  )
}


const containerSld: CSSProperties = {
  display: "flex" ,
  flexDirection: "column",
  border: "1pc solid #fff",
  padding: "20px",
  borderRadius: "10px",
  width: "600px",
  gap: "20px"
};

