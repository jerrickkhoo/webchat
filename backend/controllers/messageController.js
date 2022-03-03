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


module.exports = router;
