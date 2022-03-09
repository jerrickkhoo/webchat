const express = require("express");
const router = express.Router();
const Chat = require("../models/chat.js");

//new
router.post("/", async (req, res) => {
  try {
    const createdChat = await Chat.create({participants: [req.body.senderID, req.body.receiverID], notifications: [0,0]});
    res.status(200).json({ data: createdChat });
  } catch (error) {
    res.status(400).json({ error: error,});
  }
});

//get
router.get('/:userID', async (req, res) => {
    try{
        const chat = await Chat.find({
            participants: {$in:[req.params.userID]},
        })
        res.status(200).json(chat)
    } catch (error) {
    res.status(400).json({ error: error,});
    }
})

//delete
router.delete("/:chatID", async (req, res) => {
  try {
      const deleteChat = await Chat.findOneAndDelete({
        _id: req.params.chatID})
        res.status(200).json({ message: "Chat Deleted", data: deleteChat });
      }
   catch (error) {
    res.status(400).json({ message: "Failed to delete chat ", error: error });
  }
});

//noti sender update
router.put("/sender/:id", async (req, res) => {
  try {
    const updatedNoti = await Chat.findByIdAndUpdate(
      req.params.id,
      { $inc: { senderNoti: 1 } },
      { new: true })
      res.status(200).json({ message: "Noti added", data: updatedNoti });
  } catch (error) {
    res.status(400).json({ message: "Failed to add noti ", error: error });
  }
});


//noti receiver update
router.put("/receiver/:id", async (req, res) => {
  try {
    const updatedNoti = await Chat.findByIdAndUpdate(
      req.params.id,
      { $inc: { receiverNoti: 1 } },
      { new: true })
      res.status(200).json({ message: "Noti added", data: updatedNoti });
  } catch (error) {
    res.status(400).json({ message: "Failed to add noti ", error: error });
  }
});




module.exports = router;
