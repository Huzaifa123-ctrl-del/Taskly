import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container page center-state">
      <h1 className="big-404">404</h1>
      <h2>Page not found</h2>
      <p className="muted">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>
    </div>
  );
}
