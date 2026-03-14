import type { LeadDto } from '../domain/entities/Lead';

export interface ILeadRepository {
  salvar(lead: LeadDto): LeadDto;
  listar(): LeadDto[];
  buscarPorId(id: string): LeadDto | null;
  atualizar(id: string, lead: LeadDto): LeadDto | null;
}

export class LeadRepositoryEmMemoria implements ILeadRepository {
  private readonly leads = new Map<string, LeadDto>();

  salvar(lead: LeadDto): LeadDto {
    this.leads.set(lead.id, lead);
    return lead;
  }

  listar(): LeadDto[] {
    return Array.from(this.leads.values());
  }

  buscarPorId(id: string): LeadDto | null {
    return this.leads.get(id) ?? null;
  }

  atualizar(id: string, lead: LeadDto): LeadDto | null {
    if (!this.leads.has(id)) return null;
    this.leads.set(id, lead);
    return lead;
  }
}
