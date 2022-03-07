const express = require("express");
const router = express.Router();
const Chat = require("../models/chat.js");

//new
router.post("/", async (req, res) => {
  try {
    const createdChat = await Chat.create({participants: [req.body.senderID, req.body.receiverID]});
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





module.exports = router;
