const API_BASE = import.meta.env.DEV ? "/api" : "/api";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.erro || res.statusText || "Erro na requisição");
  }
  return res.json();
}

export const api = {
  leads: {
    list: () => request<import("@/types/lead").LeadListItem[]>("/leads"),
    get: (id: string) =>
      request<import("@/types/lead").Lead>(`/leads/${id}`),
    create: (body: import("@/types/lead").CreateLeadRequest) =>
      request<import("@/types/lead").Lead>("/leads", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    evoluir: (id: string, body: import("@/types/lead").EvoluirNegociacaoRequest) =>
      request<import("@/types/lead").Lead>(`/leads/${id}/evoluir`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
  },
};
