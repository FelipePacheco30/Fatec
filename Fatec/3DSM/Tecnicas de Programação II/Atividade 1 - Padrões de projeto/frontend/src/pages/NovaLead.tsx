import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { api } from "@/api/client";
import { CANAIS_ORIGEM } from "@/types/lead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  extrairDigitosTelefone,
  filtrarNomeLetras,
  filtrarVeiculoAlfanumerico,
  formatarTelefoneBr,
  validarNomeCliente,
  validarTelefoneDigitos,
  validarVeiculoInteresse,
} from "@/lib/leadInput";

export function NovaLead() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    nomeCliente: "",
    telefone: "",
    canalOrigem: "",
    veiculoInteresse: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.canalOrigem) {
      setError("Selecione o canal de origem.");
      return;
    }
    const nomeErr = validarNomeCliente(form.nomeCliente);
    if (nomeErr) {
      setError(nomeErr);
      return;
    }
    const telDigits = extrairDigitosTelefone(form.telefone);
    const telErr = validarTelefoneDigitos(telDigits);
    if (telErr) {
      setError(telErr);
      return;
    }
    const veiErr = validarVeiculoInteresse(form.veiculoInteresse);
    if (veiErr) {
      setError(veiErr);
      return;
    }
    setLoading(true);
    api.leads
      .create({
        nomeCliente: form.nomeCliente.trim(),
        telefone: telDigits,
        canalOrigem: form.canalOrigem,
        veiculoInteresse: form.veiculoInteresse.trim(),
      })
      .then((lead) => navigate(`/leads/${lead.id}`))
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Nova lead
        </h1>
        <p className="mt-1 text-muted-foreground">
          Cadastre um novo contato para acompanhamento
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do cliente</CardTitle>
          <CardDescription>
            Preencha os dados do potencial comprador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="nomeCliente">Nome do cliente</Label>
              <Input
                id="nomeCliente"
                placeholder="Ex.: João Silva"
                value={form.nomeCliente}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    nomeCliente: filtrarNomeLetras(e.target.value),
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="Ex.: 11 98765-4321"
                maxLength={14}
                value={form.telefone}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    telefone: formatarTelefoneBr(e.target.value),
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Canal de origem</Label>
              <Select
                value={form.canalOrigem}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, canalOrigem: v }))
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o canal" />
                </SelectTrigger>
                <SelectContent>
                  {CANAIS_ORIGEM.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="veiculoInteresse">Veículo de interesse</Label>
              <Input
                id="veiculoInteresse"
                placeholder="Ex.: Fiat Argo 2024"
                value={form.veiculoInteresse}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    veiculoInteresse: filtrarVeiculoAlfanumerico(e.target.value),
                  }))
                }
                required
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  "Cadastrar lead"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
