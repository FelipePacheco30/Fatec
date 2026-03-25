import { useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "@/api/client";
import type { Lead } from "@/types/lead";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EvoluirDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead;
  onSuccess: () => void;
}

const ESTAGIOS_PROXIMOS: Record<string, string[]> = {
  "Contato inicial": ["Enviou proposta"],
  "Enviou proposta": ["Aguardando resposta do cliente"],
  "Aguardando resposta do cliente": ["Aguardando pagamento"],
  "Aguardando pagamento": [],
};

const STATUS_PROXIMOS: Record<string, string[]> = {
  Aberto: ["Em negociação"],
  "Em negociação": ["Finalizado com venda", "Finalizado sem venda"],
  "Finalizado com venda": [],
  "Finalizado sem venda": [],
};

export function EvoluirDialog({
  open,
  onOpenChange,
  lead,
  onSuccess,
}: EvoluirDialogProps) {
  const [estagio, setEstagio] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const estagiosOpcoes = ESTAGIOS_PROXIMOS[lead.estagio] ?? [];
  const statusOpcoes = STATUS_PROXIMOS[lead.status] ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estagio && !status) return;
    setError(null);
    setLoading(true);
    api.leads
      .evoluir(lead.id, {
        ...(estagio && { estagio: estagio as Lead["estagio"] }),
        ...(status && { status: status as Lead["status"] }),
      })
      .then(() => {
        onSuccess();
        setEstagio("");
        setStatus("");
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Evoluir negociação</DialogTitle>
          <DialogDescription>
            Você pode alterar só o estágio, só o status ou os dois de uma vez.
            As transições continuam sujeitas às regras de negócio.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          {estagiosOpcoes.length > 0 && (
            <div className="space-y-2">
              <Label>Novo estágio</Label>
              <Select value={estagio} onValueChange={setEstagio}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o estágio" />
                </SelectTrigger>
                <SelectContent>
                  {estagiosOpcoes.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {statusOpcoes.length > 0 && (
            <div className="space-y-2">
              <Label>Novo status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOpcoes.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {estagiosOpcoes.length === 0 && statusOpcoes.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Esta lead não possui mais transições disponíveis.
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={
                loading ||
                ((!estagio && !status) &&
                  (estagiosOpcoes.length > 0 || statusOpcoes.length > 0))
              }
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Atualizar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
