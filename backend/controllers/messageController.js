const express = require("express");
const router = express.Router();
const Message = require("../models/message.js");

//create
router.post('/', async (req, res) => {
   try{
       const newMessage = await Message.create(req.body)
       res.status(200).json({newMessage})
   } catch (err) {
       res.status(400).json(err)
   }
})

//get
router.get("/:chatID", async (req, res) => {
  try {
    const message = await Message.find({chatID: req.params.chatID});
    res.status(200).json({ message });
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete
router.put("/delete/:messageID", async (req, res) => {
  try {
      const deleteMessage = await Message.findByIdAndUpdate(
        req.params.messageID, 
        {body: req.body.body},
        { new: true });
      res.status(200).json({ message: "message deleted", data: deleteMessage });
    } catch (err) {
      res.status(400).json({ message: "fail to delete essage ", error: err });
    }
  })

//edit
router.put("/:messageID", async (req, res) => {
  try {
      const editedMessage = await Message.findByIdAndUpdate(
        req.params.messageID, 
        {body: req.body.body},
        { new: true });
      res.status(200).json({ message: "message edited", data: editedMessage });
    } catch (err) {
      res.status(400).json({ message: "fail to edit essage ", error: err });
    }
  })

module.exports = router;
