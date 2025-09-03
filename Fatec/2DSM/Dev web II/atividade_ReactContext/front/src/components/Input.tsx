import type { CSSProperties } from 'react';
import { useState } from "react";

export default function Input() {
    const [entrada, setEntrada] = useState ("")

    return <input style={inputSld}
    value={entrada}
    onChange={(e) => setEntrada(e.target.value)}/>

} 


const inputSld: CSSProperties = {
  display: "flex"

}
