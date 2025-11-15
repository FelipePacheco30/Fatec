import Scheduler from "./components/Scheduler";

export default function App() {
  return (
    <>
      <div className="header">
        Sistema de Agendamento Médico
      </div>

      <div className="container">
        <Scheduler />
      </div>
    </>
  );
}
