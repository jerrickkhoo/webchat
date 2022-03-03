const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = Schema(
  {
    chatID: {
      type: String
    },
    senderID: {
      type: String
    },
    senderName:{
      type: String
    },
    body: {
      type: String
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
