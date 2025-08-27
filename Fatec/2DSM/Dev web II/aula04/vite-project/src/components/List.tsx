import useUser from "../hooks/useUser";
import type { User } from "../types";

export default function List(){
    const {users, remove} = useUser();

    function remover(e: React.MouseEvent, indice:number){
        e.preventDefault();
        remove(indice);
    }

    return <ol>
        {
            users.map( function(item:User, indice:number){
                return <li key={indice} onContextMenu={(e) => remover(e,indice)}>{item.name}</li>
            })
        }
    </ol>
}

