import express from 'express';
import { createLeadsRouter } from './routes/leads.routes';
import { LeadServiceFacade } from './services/LeadServiceFacade';
import { LeadFactory } from './domain/factory/LeadFactory';
import { LeadRepositoryEmMemoria } from './repositories/LeadRepository';
import { LeadSubject } from './domain/observer/LeadSubject';
import { LoggingLeadObserver } from './domain/observer/LeadObserver';
import { createLeadValidationChain } from './domain/validation';

function gerarId(): string {
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createApp(): express.Application {
  const app = express();
  app.use(express.json());

  // [Composition Root] Montagem das dependencias:
  // - repository em memoria (persistencia simples)
  // - observer/log (para auditoria de mudancas)
  // - facade (orquestra o dominio com Factory + State + Observer)
  // - chain de validacao (Chain of Responsibility) para o cadastro
  const repository = new LeadRepositoryEmMemoria();
  const subject = new LeadSubject();
  subject.adicionarObserver(new LoggingLeadObserver());

  const facade = new LeadServiceFacade(
    new LeadFactory(),
    repository,
    subject,
    gerarId
  );

  const validationChain = createLeadValidationChain();
  app.use('/leads', createLeadsRouter(facade, validationChain));

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  return app;
}
