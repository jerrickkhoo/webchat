const express = require('express')
const mongoose = require('mongoose')
const userController = require('./controllers/userController')
const chatController = require('./controllers/chatController')
const messageController = require('./controllers/messageController')
const Pusher = require("pusher");
const path = require('path')


require('dotenv').config()
const app = express()
const port = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET

const pusher = new Pusher({
  appId: "1358427",
  key: "37faff3d0d75937717d5",
  secret: "ce7d68f535e763af4c6a",
  cluster: "ap1",
  useTLS: true,
});

mongoose.connection.on('error', (err) => 
    console.log(err.message + ' is mongoDB not running?')
)
mongoose.connection.on('disconnected', () => console.log('mongoDB disconnected'))

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
})
mongoose.connection.once('open', () => {
    console.log('connected to mongoose at ' + MONGODB_URI)
    const message = mongoose.connection.collection('messages')
    const changeStream = message.watch()

    changeStream.on('change', (change) => {
        console.log('A change occurred', change)
        
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument
            pusher.trigger("messages", "inserted", {
              senderName: messageDetails.senderName,
              body: messageDetails.body,
              _id: messageDetails._id,
              chatID: messageDetails.chatID,
              senderID: messageDetails.senderID,
              createdAt: messageDetails.createdAt,
              updatedAt: messageDetails.updatedAt
            });
        } else {
            console.log('Error')
        }
    })

})



//middleware
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use('/api/users', userController)
app.use("/api/chats", chatController);
app.use("/api/messages", messageController);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is now listening at http://localhost:${port}`)
})