/* Uso da Stack para validar expressões (parênteses / colchetes / chaves)
**
** Author: Fabrício Galende M. de Carvalho, DSc.
*/

import { MyNode, Stack } from "./stack";
import * as readline from "readline";

/**
 * Valida se uma expressão tem parênteses/colchetes/chaves corretamente balanceados.
 */
function validateExpression(expr: string): { valid: boolean; message: string } {
    const stack = new Stack<string>();
    const opens = new Set(["(", "[", "{", "<"]);
    const pairs: { [close: string]: string } = {
        ")": "(",
        "]": "[",
        "}": "{",
        ">": "<"
    };

    for (let i = 0; i < expr.length; ++i) {
        const ch = expr[i];
        if (opens.has(ch)) {
            stack.push(new MyNode<string>(ch));
        } else if (ch in pairs) {
            const popped = stack.pop();
            if (popped === null) {
                return {
                    valid: false,
                    message: `Erro: símbolo de fechamento '${ch}' na posição ${i} sem correspondente de abertura.`
                };
            } else if (popped.value !== pairs[ch]) {
                return {
                    valid: false,
                    message: `Erro: fechamento '${ch}' na posição ${i} não corresponde ao último aberto '${popped.value}'.`
                };
            }
        }
    }

    if (!stack.is_empty()) {
        const remaining: string[] = [];
        while (!stack.is_empty()) {
            const n = stack.pop();
            if (n) remaining.push(n.value);
        }
        return {
            valid: false,
            message: `Erro: existem símbolos de abertura sem fechamento: [${remaining.join(", ")}].`
        };
    }

    return {
        valid: true,
        message: "Expressão correta: parênteses/colchetes/chaves balanceados."
    };
}

/**
 * Função principal: permite que o usuário digite expressões no terminal.
 */
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("=== Validador de Expressões com Stack ===");
    console.log("Digite uma expressão (ou 'sair' para encerrar):\n");

    function askExpression() {
        rl.question("Expressão: ", (input) => {
            if (input.toLowerCase() === "sair") {
                console.log("Encerrando programa...");
                rl.close();
                return;
            }

            const result = validateExpression(input);
            console.log(result.valid ? "✅ Expressão CORRETA" : "❌ Expressão MAL FORMATADA");
            console.log(result.message);
            console.log("---------------------------------------");
            askExpression(); // continua pedindo
        });
    }

    askExpression();
}

main();
