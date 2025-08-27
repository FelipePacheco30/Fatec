import { useContext } from "react";
import { UserContext } from "../contexts/Contexto.tsx";

export default function useUser(){
    const contexto = useContext(UserContext);
    if( !contexto ){
        throw new Error("Contexto não definido");
    }
    return contexto;
}
