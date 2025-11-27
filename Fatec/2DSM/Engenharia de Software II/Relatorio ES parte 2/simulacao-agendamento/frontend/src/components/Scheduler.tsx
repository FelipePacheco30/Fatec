import { useEffect, useState } from "react";
import {
  getPatients,
  getDoctors,
  getAppointments,
  createAppointment,
  cancelAppointment
} from "../api";

export default function Scheduler() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    datetime: ""
  });

  async function load() {
    setPatients(await getPatients());
    setDoctors(await getDoctors());
    setAppointments(await getAppointments());
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await createAppointment(form);
    await load();
    setForm({ patientId: "", doctorId: "", datetime: "" });
  }

  return (
    <div>
      <h2 className="title">Agendar Nova Consulta</h2>

      <form onSubmit={handleSubmit}>
        <label>Paciente</label>
        <select
          value={form.patientId}
          onChange={e => setForm({ ...form, patientId: Number(e.target.value) })}
        >
          <option value="">Selecione...</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <label>Médico</label>
        <select
          value={form.doctorId}
          onChange={e => setForm({ ...form, doctorId: Number(e.target.value) })}
        >
          <option value="">Selecione...</option>
          {doctors.map(d => (
            <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
          ))}
        </select>

        <label>Data e Hora</label>
        <input
          type="datetime-local"
          value={form.datetime}
          onChange={e => setForm({ ...form, datetime: e.target.value })}
        />

        <button type="submit">Agendar Consulta</button>
      </form>

      {/* Listagem */}
      <h2 className="title" style={{ marginTop: "30px" }}>Consultas Agendadas</h2>

      {appointments.length === 0 && (
        <p>Nenhuma consulta agendada.</p>
      )}

      {appointments.map(a => (
        <div
          key={a.id}
          className={`appointment-item ${a.status === "Cancelada" ? "cancelada" : ""}`}
        >
          <strong>Consulta #{a.id}</strong><br />
          Paciente: {a.patientId}<br />
          Médico: {a.doctorId}<br />
          Data: {new Date(a.datetime).toLocaleString()}<br />
          Status: {a.status}<br /><br />

          {a.status !== "Cancelada" && (
            <button
              className="cancel-btn"
              onClick={() => cancelAppointment(a.id).then(load)}
            >
              Cancelar
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
