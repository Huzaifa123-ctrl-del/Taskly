const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const saved = await Message.create({ name, email, message });
    res.status(201).json({ id: saved._id, message: "Message received" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
