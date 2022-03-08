const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = Schema({
    participants:[String]
    },{timestamps: true}
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
