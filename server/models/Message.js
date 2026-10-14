const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true, maxlength: 80 },
    email: { type: String, required: [true, "Email is required"], trim: true, lowercase: true },
    message: { type: String, required: [true, "Message is required"], trim: true, maxlength: 1000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
