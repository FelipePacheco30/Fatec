import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";
import { api } from "@/api/client";
import type { LeadListItem } from "@/types/lead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function statusVariant(
  status: string
): "default" | "secondary" | "success" | "destructive" | "warning" | "outline" {
  switch (status) {
    case "Finalizado com venda":
      return "success";
    case "Finalizado sem venda":
      return "destructive";
    case "Em negociação":
      return "default";
    default:
      return "secondary";
  }
}

export function LeadList() {
  const [leads, setLeads] = useState<LeadListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.leads
      .list()
      .then(setLeads)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Carregando leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Erro</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Verifique se a API está rodando em localhost:3000.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Leads
        </h1>
        <p className="mt-1 text-muted-foreground">
          Acompanhe e evolua as negociações
        </p>
      </div>

      {leads.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground">Nenhuma lead cadastrada.</p>
            <Button asChild className="mt-4" variant="outline">
              <Link to="/nova">Cadastrar primeira lead</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <Link key={lead.id} to={`/leads/${lead.id}`}>
              <Card
                className={cn(
                  "transition-all hover:border-primary/40 hover:shadow-md",
                  "h-full"
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-1 text-base">
                      {lead.nomeCliente}
                    </CardTitle>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>
                  <CardDescription className="line-clamp-1">
                    {lead.veiculoInteresse}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-xs">
                      {lead.origem}
                    </Badge>
                    <Badge variant={statusVariant(lead.status)}>
                      {lead.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Estágio: {lead.estagio}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
