import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

const features = [
  { icon: "⚡", title: "Fast and smooth", text: "Single page experience. Create, edit and complete tasks without a single page reload." },
  { icon: "🗂️", title: "Stay organized", text: "Filter by status or priority and search instantly to find exactly what you need." },
  { icon: "☁️", title: "Saved in the cloud", text: "Every task is stored securely in MongoDB, so your work is always there when you return." },
  { icon: "📱", title: "Works everywhere", text: "A responsive design that looks great on phones, tablets and desktops." },
];

export default function Home() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.getStats().then(setStats).catch(() => setStats(null));
  }, []);

  const items = [
    { label: "Total tasks", value: stats?.total },
    { label: "To do", value: stats?.todo },
    { label: "In progress", value: stats?.inProgress },
    { label: "Completed", value: stats?.done },
  ];

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <span className="pill">New • Task management made simple</span>
          <h1>
            Plan your work. <span className="gradient-text">Get it done.</span>
          </h1>
          <p className="lead">
            Taskly helps you capture ideas, track progress and finish what matters, all in one clean and
            fast workspace.
          </p>
          <div className="hero-cta">
            <Link to="/tasks" className="btn btn-primary btn-lg">
              Open my tasks
            </Link>
            <Link to="/about" className="btn btn-ghost btn-lg">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="stats-grid">
          {items.map((s) => (
            <div className="stat" key={s.label}>
              <strong>{s.value ?? "–"}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Everything you need</h2>
        <p className="section-sub">Simple tools that keep you focused and productive.</p>
        <div className="feature-grid">
          {features.map((f) => (
            <div className="feature" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
