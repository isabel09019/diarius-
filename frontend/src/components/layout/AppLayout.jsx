import { NavLink, Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand__mark">D</div>

          <div>
            <strong>Diarius</strong>
            <span>Organize sua rotina</span>
          </div>
        </div>

        <nav className="sidebar__nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/tasks">Tarefas</NavLink>
          <NavLink to="/calendar">Agenda</NavLink>
          <NavLink to="/goals">Objetivos</NavLink>
        </nav>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <span>Minha rotina</span>

          <div className="topbar__user">
            <div className="avatar">U</div>
            <span>Usuário</span>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;