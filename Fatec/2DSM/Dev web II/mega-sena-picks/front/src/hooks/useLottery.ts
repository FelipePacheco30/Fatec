import { useContext } from "react";
import { LotteryContext } from "../contexts/LotteryContext";

export default function useLottery(){
    const context = useContext(LotteryContext);

    if( !context ){
        throw new Error("useLottery sendo usado fora do contexto");
    }
    return context;
}