const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

const validId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }
  next();
};

// Stats (must be before /:id routes)
router.get("/stats", async (req, res, next) => {
  try {
    const [total, todo, inProgress, done] = await Promise.all([
      Task.countDocuments(),
      Task.countDocuments({ status: "todo" }),
      Task.countDocuments({ status: "in-progress" }),
      Task.countDocuments({ status: "done" }),
    ]);
    res.json({ total, todo, inProgress, done });
  } catch (err) {
    next(err);
  }
});

// List with optional filters
router.get("/", async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;
    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (priority && priority !== "all") filter.priority = priority;
    if (search) filter.title = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.create({ title, description, status, priority, dueDate: dueDate || null });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validId, async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, dueDate: dueDate || null },
      { new: true, runValidators: true, omitUndefined: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validId, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
