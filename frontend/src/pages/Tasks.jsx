import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "diarius.tasks.v1";
function loadTasks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function formatDate(value) {
  if (!value) return "Sem prazo";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export default function Tasks() {
  const [tasks, setTasks] = useState(loadTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Média");
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }, [tasks]);
  const filteredTasks = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    return tasks.filter(task => {
      const matchesFilter = filter === "Todas" || (filter === "Pendentes" && !task.completed) || (filter === "Concluídas" && task.completed);
      const matchesSearch = !term || `${task.title} ${task.description}`.toLocaleLowerCase("pt-BR").includes(term);
      return matchesFilter && matchesSearch;
    }).sort((a, b) => {
      if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed);
      const order = { Alta: 0, Média: 1, Baixa: 2 };
      return order[a.priority] - order[b.priority] || (a.dueDate || "9999-12-31").localeCompare(b.dueDate || "9999-12-31");
    });
  }, [tasks, filter, search]);
  const pending = tasks.filter(task => !task.completed).length;
  const completed = tasks.length - pending;

  function resetForm() { setTitle(""); setDescription(""); setDueDate(""); setPriority("Média"); setEditingId(null); }
  function submit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) { setFeedback("Informe o título da tarefa."); return; }
    if (editingId) {
      setTasks(current => current.map(task => task.id === editingId ? { ...task, title: cleanTitle, description: description.trim(), dueDate, priority } : task));
      setFeedback("Tarefa atualizada com sucesso.");
    } else {
      setTasks(current => [{ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, title: cleanTitle, description: description.trim(), dueDate, priority, completed: false }, ...current]);
      setFeedback("Tarefa criada com sucesso.");
    }
    resetForm();
  }
  function edit(task) { setEditingId(task.id); setTitle(task.title); setDescription(task.description || ""); setDueDate(task.dueDate || ""); setPriority(task.priority || "Média"); setFeedback(""); document.querySelector(".task-form")?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  function toggle(id) { setTasks(current => current.map(task => task.id === id ? { ...task, completed: !task.completed } : task)); setFeedback(""); }
  function remove(task) { if (window.confirm(`Excluir a tarefa “${task.title}”?`)) { setTasks(current => current.filter(item => item.id !== task.id)); if (editingId === task.id) resetForm(); setFeedback("Tarefa excluída."); } }

  return <>
    <section className="page-header tasks-page-header"><div><span className="eyebrow">ORGANIZAÇÃO PESSOAL</span><h1>Minhas tarefas</h1><p>Transforme suas prioridades em pequenas ações, um passo de cada vez.</p></div></section>
    <section className="task-summary" aria-label="Resumo das tarefas">
      <article className="task-summary-card"><span className="task-summary-icon task-summary-icon--all">▤</span><div><strong>{tasks.length}</strong><span>Tarefas no total</span></div></article>
      <article className="task-summary-card"><span className="task-summary-icon task-summary-icon--pending">◷</span><div><strong>{pending}</strong><span>Pendentes</span></div></article>
      <article className="task-summary-card"><span className="task-summary-icon task-summary-icon--done">✓</span><div><strong>{completed}</strong><span>Concluídas</span></div></article>
    </section>
    <section className="tasks-layout">
      <article className="task-panel">
        <div className="task-panel-heading"><div><span className="eyebrow">{editingId ? "EDIÇÃO" : "NOVA ATIVIDADE"}</span><h2>{editingId ? "Editar tarefa" : "Criar tarefa"}</h2></div>{editingId && <button className="button button--quiet" type="button" onClick={resetForm}>Cancelar</button>}</div>
        <form className="task-form" onSubmit={submit}>
          <label>Título <span aria-hidden="true">*</span><input value={title} onChange={e => setTitle(e.target.value)} maxLength={100} placeholder="Ex.: Finalizar relatório" required /></label>
          <label>Descrição<textarea value={description} onChange={e => setDescription(e.target.value)} maxLength={500} rows={3} placeholder="Detalhes ou próximos passos (opcional)" /></label>
          <div className="task-form-row"><label>Prazo<input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /></label><label>Prioridade<select value={priority} onChange={e => setPriority(e.target.value)}><option>Baixa</option><option>Média</option><option>Alta</option></select></label></div>
          <button className="button button--primary task-submit" type="submit">{editingId ? "Salvar alterações" : "+ Adicionar tarefa"}</button>
          {feedback && <p className="task-feedback" role="status">{feedback}</p>}
        </form><p className="task-storage-note">As tarefas ficam salvas neste navegador.</p>
      </article>
      <article className="task-panel">
        <div className="task-panel-heading"><div><span className="eyebrow">ACOMPANHAMENTO</span><h2>Lista de tarefas</h2></div><span className="task-count">{filteredTasks.length} {filteredTasks.length === 1 ? "item" : "itens"}</span></div>
        <div className="task-controls"><label className="task-search"><span aria-hidden="true">⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar tarefas..." aria-label="Buscar tarefas" /></label><div className="task-filters" aria-label="Filtrar tarefas">{["Todas", "Pendentes", "Concluídas"].map(option => <button key={option} type="button" className={`task-filter ${filter === option ? "is-active" : ""}`} onClick={() => setFilter(option)} aria-pressed={filter === option}>{option}</button>)}</div></div>
        {filteredTasks.length === 0 ? <div className="tasks-empty"><span className="tasks-empty-icon">✓</span><h3>{tasks.length === 0 ? "Tudo começa com uma tarefa" : "Nenhuma tarefa encontrada"}</h3><p>{tasks.length === 0 ? "Use o formulário para registrar sua primeira atividade." : "Mude o filtro ou tente outro termo de busca."}</p></div> : <ul className="task-list">{filteredTasks.map(task => <li className={`task-item ${task.completed ? "is-completed" : ""}`} key={task.id}><button className={`task-check ${task.completed ? "is-checked" : ""}`} type="button" onClick={() => toggle(task.id)} aria-label={task.completed ? `Marcar ${task.title} como pendente` : `Concluir ${task.title}`} aria-pressed={task.completed}>{task.completed ? "✓" : ""}</button><div className="task-item-content"><div className="task-item-title-row"><h3>{task.title}</h3><span className={`priority-badge priority-badge--${task.priority.toLowerCase()}`}>{task.priority}</span></div>{task.description && <p>{task.description}</p>}<span className="task-due-date">◷ {formatDate(task.dueDate)}</span></div><div className="task-item-actions"><button type="button" onClick={() => edit(task)} aria-label={`Editar ${task.title}`} title="Editar">✎</button><button type="button" onClick={() => remove(task)} aria-label={`Excluir ${task.title}`} title="Excluir">×</button></div></li>)}</ul>}
      </article>
    </section>
  </>;
}
