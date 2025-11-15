const API = "http://localhost:3001/api";

export const getPatients = () => fetch(API + "/patients").then(r => r.json());
export const getDoctors = () => fetch(API + "/doctors").then(r => r.json());
export const getAppointments = () => fetch(API + "/appointments").then(r => r.json());

export async function createAppointment(data) {
  const res = await fetch(API + "/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao agendar");
  return res.json();
}

export const cancelAppointment = id =>
  fetch(API + "/appointments/" + id + "/cancel", { method: "POST" }).then(r => r.json());