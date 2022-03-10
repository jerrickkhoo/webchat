const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = Schema(
  {
    participants: [String],
    participant1: Number,
    participant2: Number
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
