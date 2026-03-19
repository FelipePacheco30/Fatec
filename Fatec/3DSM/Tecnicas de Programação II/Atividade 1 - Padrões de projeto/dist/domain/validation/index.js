"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLeadValidationChain = createLeadValidationChain;
const CreateLeadValidators_1 = require("./CreateLeadValidators");
function createLeadValidationChain() {
    // [Chain of Responsibility] Montagem fixa da cadeia para cadastro:
    // Campos obrigatorios -> canal de origem
    const obrigatorios = new CreateLeadValidators_1.CamposObrigatoriosValidator();
    const canal = new CreateLeadValidators_1.CanalOrigemValidator();
    obrigatorios.setProximo(canal);
    return obrigatorios;
}
