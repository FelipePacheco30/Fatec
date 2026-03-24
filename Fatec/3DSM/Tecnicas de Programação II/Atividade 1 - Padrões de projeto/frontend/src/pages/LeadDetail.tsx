import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2, TrendingUp } from "lucide-react";
import { api } from "@/api/client";
import type { Lead } from "@/types/lead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EvoluirDialog } from "@/components/leads/EvoluirDialog";
import { cn } from "@/lib/utils";
import { formatarTelefoneBr } from "@/lib/leadInput";

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [evoluirOpen, setEvoluirOpen] = useState(false);

  const refresh = () => {
    if (!id) return;
    api.leads
      .get(id)
      .then(setLead)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    refresh();
  }, [id]);

  if (!id) {
    navigate("/");
    return null;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Erro</CardTitle>
          <CardDescription>{error || "Lead não encontrada."}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link to="/">Voltar à listagem</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const podeEvoluir =
    lead.status !== "Finalizado com venda" &&
    lead.status !== "Finalizado sem venda";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground">
            {lead.nomeCliente}
          </h1>
          <p className="text-muted-foreground">{lead.veiculoInteresse}</p>
        </div>
        {podeEvoluir && (
          <Button onClick={() => setEvoluirOpen(true)}>
            <TrendingUp className="h-4 w-4" />
            Evoluir negociação
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações</CardTitle>
            <CardDescription>Dados do contato e origem</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Telefone
              </p>
              <p className="font-medium">
                {formatarTelefoneBr(lead.telefone)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Canal de origem
              </p>
              <p className="font-medium">{lead.canalOrigem}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Cadastrado em
              </p>
              <p className="font-medium">{formatDate(lead.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Última atualização
              </p>
              <p className="font-medium">{formatDate(lead.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Negociação</CardTitle>
            <CardDescription>Estágio e status atual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                Estágio
              </p>
              <Badge variant="outline" className="text-sm">
                {lead.estagio}
              </Badge>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                Status
              </p>
              <Badge
                variant={statusVariant(lead.status)}
                className={cn(
                  "text-sm",
                  lead.status === "Finalizado com venda" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
                  lead.status === "Finalizado sem venda" && "bg-red-500/15 text-red-700 dark:text-red-400"
                )}
              >
                {lead.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <EvoluirDialog
        open={evoluirOpen}
        onOpenChange={setEvoluirOpen}
        lead={lead}
        onSuccess={() => {
          setEvoluirOpen(false);
          refresh();
        }}
      />
    </div>
  );
}
