const statusLabels = { todo: "To do", "in-progress": "In progress", done: "Done" };

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const due = task.dueDate ? new Date(task.dueDate) : null;
  const overdue = due && task.status !== "done" && due < new Date(new Date().toDateString());

  return (
    <article className={`task-card ${task.status === "done" ? "is-done" : ""}`}>
      <div className="task-top">
        <span className={`badge priority-${task.priority}`}>{task.priority}</span>
        <span className={`badge status-${task.status}`}>{statusLabels[task.status]}</span>
      </div>

      <h3 className="task-title">{task.title}</h3>
      {task.description && <p className="task-desc">{task.description}</p>}

      {due && (
        <p className={`task-due ${overdue ? "overdue" : ""}`}>
          {overdue ? "Overdue: " : "Due: "}
          {due.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
        </p>
      )}

      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task, e.target.value)}
          aria-label="Change status"
        >
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <div className="task-btns">
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(task)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
