
interface Props {
    nome: string;
    idade: number;
}

export default function Saudacao(props:Props){
    return <div>Olá {props.nome} você tem {props.idade} anos</div>;
}