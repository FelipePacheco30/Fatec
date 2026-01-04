import Cliente from "./Cliente";

let nasc = new Date(1965, 10, 1);
let cliente = new Cliente("Fulano", "fulano@gmail.com", nasc, 500);
cliente.imprimir();

nasc = new Date(2001, 9, 10);
cliente = new Cliente("Beltrano", "beltrano@gmail.com", nasc, 1500);
cliente.imprimir();
