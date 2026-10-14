require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const taskRoutes = require("./routes/tasks");
const messageRoutes = require("./routes/messages");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// --- YAHAN ADD KIYA ---
app.get("/", (req, res) => {
  res.json({ message: "Taskly API Running - Go to /api/health" });
});
app.get("/api", (req, res) => {
  res.json({ message: "API is working" });
});
// ----------------------

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/tasks", taskRoutes);
app.use("/api/messages", messageRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.name === "ValidationError" ? 400 : err.status || 500;
  res.status(status).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskly")
  .then(() => {
    console.log("MongoDB connected");
    if (require.main === module) {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    if (require.main === module) process.exit(1);
  });

module.exports = app;