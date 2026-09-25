import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

function Dashboard() {
  const [apiStatus, setApiStatus] = useState("Verificando...");

  useEffect(() => {
    apiRequest("/health")
      .then(() => {
        setApiStatus("Online");
      })
      .catch(() => {
        setApiStatus("Offline");
      });
  }, []);

  return (
    <>
      <section className="page-header">
        <div>
          <span className="eyebrow">SEGUNDA-FEIRA</span>

          <h1>Bom dia! 👋</h1>

          <p>
            Vamos organizar o que precisa ser feito hoje.
          </p>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card dashboard-card--large">
          <span className="card-label">
            PRÓXIMA AÇÃO
          </span>

          <h2>Organize sua primeira tarefa</h2>

          <p>
            Suas tarefas aparecerão aqui quando você começar
            a organizar sua rotina.
          </p>

          <button className="button button--primary">
            Criar tarefa
          </button>
        </article>

        <article className="dashboard-card">
          <span className="card-label">
            HOJE
          </span>

          <strong className="metric">0</strong>

          <span className="metric-description">
            tarefas concluídas
          </span>
        </article>

        <article className="dashboard-card">
          <span className="card-label">
            API
          </span>

          <strong className="metric">
            {apiStatus}
          </strong>

          <span className="metric-description">
            comunicação com o backend
          </span>
        </article>
      </section>
    </>
  );
}

export default Dashboard;