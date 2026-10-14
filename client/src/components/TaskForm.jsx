import { useEffect, useState } from "react";

const empty = { title: "", description: "", status: "todo", priority: "medium", dueDate: "" };

export default function TaskForm({ task, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      });
    } else {
      setForm(empty);
    }
  }, [task]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Please enter a title.");
    setSaving(true);
    setError("");
    try {
      await onSave(form);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-head">
          <h2>{task ? "Edit task" : "New task"}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <form onSubmit={submit} className="form">
          <label>
            Title
            <input name="title" value={form.title} onChange={change} placeholder="e.g. Design landing page" maxLength={120} autoFocus />
          </label>

          <label>
            Description
            <textarea name="description" value={form.description} onChange={change} rows={3} placeholder="Add some details (optional)" maxLength={600} />
          </label>

          <div className="form-row">
            <label>
              Status
              <select name="status" value={form.status} onChange={change}>
                <option value="todo">To do</option>
                <option value="in-progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </label>
            <label>
              Priority
              <select name="priority" value={form.priority} onChange={change}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          <label>
            Due date
            <input type="date" name="dueDate" value={form.dueDate} onChange={change} />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : task ? "Save changes" : "Add task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
