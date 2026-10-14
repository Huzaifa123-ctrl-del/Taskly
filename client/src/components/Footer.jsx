export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} Taskly. All rights reserved.</p>
        <p className="muted">Built with React, Node.js and MongoDB.</p>
      </div>
    </footer>
  );
}
