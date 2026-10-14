import { Link } from "react-router-dom";

const stack = [
  { name: "React", text: "Component based UI with hooks." },
  { name: "React Router", text: "Instant page navigation without reloads." },
  { name: "Node.js + Express", text: "A clean and simple REST API." },
  { name: "MongoDB", text: "Flexible and reliable data storage." },
];

export default function About() {
  return (
    <div className="container page">
      <div className="page-head column">
        <h1>About Taskly</h1>
        <p className="lead narrow">
          Taskly is a lightweight task manager designed to keep you focused. No clutter, no learning
          curve, just a clear view of what needs to be done.
        </p>
      </div>

      <div className="feature-grid">
        {stack.map((s) => (
          <div className="feature" key={s.name}>
            <h3>{s.name}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>

      <div className="cta-box">
        <h2>Ready to get organized?</h2>
        <p>Start adding tasks in seconds.</p>
        <Link to="/tasks" className="btn btn-primary btn-lg">
          Go to tasks
        </Link>
      </div>
    </div>
  );
}
