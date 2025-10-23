/* Basic generic Stack implementation in TypeScript
**
** Author: Fabrício Galende M. de Carvalho DSc
** Adaptado por: ChatGPT
*/

class MyNode<T> {
    value: T;
    next: MyNode<T> | null;
    constructor(v: T) {
        this.value = v;
        this.next = null;
    }
}

class Stack<T> {
    length: number;
    top: MyNode<T> | null;
    constructor() {
        this.top = null;
        this.length = 0;
    }

    is_empty(): boolean {
        return this.length === 0;
    }

    push(node: MyNode<T>): void {
        node.next = this.top;
        this.top = node;
        ++this.length;
    }

    pop(): MyNode<T> | null {
        if (this.is_empty()) {
            return null;
        }
        const node = this.top!;
        this.top = node.next;
        node.next = null; // desconecta
        --this.length;
        return node;
    }

    peek(): MyNode<T> | null {
        return this.top;
    }

    print(): void {
        let current_node = this.top;
        console.log("vvvv Top ");
        while (current_node !== null) {
            console.log(current_node.value);
            current_node = current_node.next;
        }
        console.log("^^^^ Base ");
    }
}

export {
    MyNode, Stack
}
