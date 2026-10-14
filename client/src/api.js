const BASE = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Something went wrong");
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  getTasks: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/tasks${qs ? `?${qs}` : ""}`);
  },
  getStats: () => request("/tasks/stats"),
  createTask: (data) => request("/tasks", { method: "POST", body: JSON.stringify(data) }),
  updateTask: (id, data) => request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTask: (id) => request(`/tasks/${id}`, { method: "DELETE" }),
  sendMessage: (data) => request("/messages", { method: "POST", body: JSON.stringify(data) }),
};
