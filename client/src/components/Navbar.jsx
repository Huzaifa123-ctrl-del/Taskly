import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/tasks", label: "Tasks" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">T</span>
          Taskly
        </Link>

        <button
          className={`burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/tasks" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
