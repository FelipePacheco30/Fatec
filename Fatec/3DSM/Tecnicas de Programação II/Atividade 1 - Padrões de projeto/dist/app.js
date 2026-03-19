"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const leads_routes_1 = require("./routes/leads.routes");
const LeadServiceFacade_1 = require("./services/LeadServiceFacade");
const LeadFactory_1 = require("./domain/factory/LeadFactory");
const LeadRepository_1 = require("./repositories/LeadRepository");
const LeadSubject_1 = require("./domain/observer/LeadSubject");
const LeadObserver_1 = require("./domain/observer/LeadObserver");
const validation_1 = require("./domain/validation");
function gerarId() {
    return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // [Composition Root] Montagem das dependencias:
    // - repository em memoria (persistencia simples)
    // - observer/log (para auditoria de mudancas)
    // - facade (orquestra o dominio com Factory + State + Observer)
    // - chain de validacao (Chain of Responsibility) para o cadastro
    const repository = new LeadRepository_1.LeadRepositoryEmMemoria();
    const subject = new LeadSubject_1.LeadSubject();
    subject.adicionarObserver(new LeadObserver_1.LoggingLeadObserver());
    const facade = new LeadServiceFacade_1.LeadServiceFacade(new LeadFactory_1.LeadFactory(), repository, subject, gerarId);
    const validationChain = (0, validation_1.createLeadValidationChain)();
    app.use('/leads', (0, leads_routes_1.createLeadsRouter)(facade, validationChain));
    app.get('/health', (_req, res) => res.json({ status: 'ok' }));
    return app;
}
