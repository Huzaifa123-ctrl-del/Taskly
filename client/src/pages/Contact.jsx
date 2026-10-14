import { useState } from "react";
import { api } from "../api.js";

const initial = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", text: "" });
    try {
      await api.sendMessage(form);
      setStatus({ type: "success", text: "Thanks! Your message has been sent." });
      setForm(initial);
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container page">
      <div className="page-head column">
        <h1>Contact us</h1>
        <p className="lead narrow">Have a question or feedback? Send us a message and we will get back to you.</p>
      </div>

      <form className="form card-form" onSubmit={submit}>
        <div className="form-row">
          <label>
            Name
            <input name="name" value={form.name} onChange={change} placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={change} placeholder="you@example.com" required />
          </label>
        </div>
        <label>
          Message
          <textarea name="message" value={form.message} onChange={change} rows={5} placeholder="How can we help?" required maxLength={1000} />
        </label>

        {status.text && <p className={status.type === "success" ? "form-success" : "form-error"}>{status.text}</p>}

        <button className="btn btn-primary" disabled={sending}>
          {sending ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}
