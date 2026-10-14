import { useCallback, useEffect, useState } from "react";
import { api } from "../api.js";
import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const load = useCallback(async () => {
    try {
      setError("");
      const data = await api.getTasks({ search, status, priority });
      setTasks(data);
    } catch (err) {
      setError(err.message || "Could not load tasks");
    } finally {
      setLoading(false);
    }
  }, [search, status, priority]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (task) => {
    setEditing(task);
    setFormOpen(true);
  };

  const closeForm = useCallback(() => setFormOpen(false), []);

  const save = async (data) => {
    if (editing) {
      const updated = await api.updateTask(editing._id, data);
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      notify("Task updated");
    } else {
      const created = await api.createTask(data);
      setTasks((prev) => [created, ...prev]);
      notify("Task added");
    }
    setFormOpen(false);
  };

  const changeStatus = async (task, newStatus) => {
    const previous = tasks;
    setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t)));
    try {
      await api.updateTask(task._id, { ...task, status: newStatus });
    } catch (err) {
      setTasks(previous);
      notify(err.message);
    }
  };

  const remove = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    try {
      await api.deleteTask(task._id);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      notify("Task deleted");
    } catch (err) {
      notify(err.message);
    }
  };

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h1>My tasks</h1>
          <p className="muted">{tasks.length} {tasks.length === 1 ? "task" : "tasks"} found</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>
          + New task
        </button>
      </div>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="all">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {loading ? (
        <div className="center-state">
          <div className="spinner"></div>
          <p className="muted">Loading tasks...</p>
        </div>
      ) : error ? (
        <div className="center-state">
          <p className="form-error">{error}</p>
          <button className="btn btn-ghost" onClick={load}>
            Try again
          </button>
        </div>
      ) : tasks.length === 0 ? (
        <div className="center-state empty">
          <div className="empty-icon">📝</div>
          <h3>No tasks yet</h3>
          <p className="muted">Create your first task to get started.</p>
          <button className="btn btn-primary" onClick={openNew}>
            + New task
          </button>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((t) => (
            <TaskCard key={t._id} task={t} onEdit={openEdit} onDelete={remove} onStatusChange={changeStatus} />
          ))}
        </div>
      )}

      {formOpen && <TaskForm task={editing} onClose={closeForm} onSave={save} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
