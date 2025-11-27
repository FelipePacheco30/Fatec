import { Router } from "express";
import { appointments, patients, doctors } from "./data";

export const router = Router();
router.get("/patients", (req, res) => res.json(patients));
router.get("/doctors", (req, res) => res.json(doctors));
router.get("/appointments", (req, res) => res.json(appointments));

router.post("/appointments", (req, res) => {
  const { patientId, doctorId, datetime } = req.body;
  const conflict = appointments.some(a => a.doctorId === doctorId && a.datetime === datetime);
  if (conflict) return res.status(409).json({ error: "Horário indisponível" });
  const id = appointments.length + 1;
  const newA = { id, patientId, doctorId, datetime, status: "Agendada" };
  appointments.push(newA);
  res.status(201).json(newA);
});

router.post("/appointments/:id/cancel", (req, res) => {
  const id = Number(req.params.id);
  const a = appointments.find(a => a.id === id);
  if (!a) return res.status(404).json({ error: "Consulta não encontrada" });
  a.status = "Cancelada";
  res.json(a);
});