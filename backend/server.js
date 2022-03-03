const express = require('express')
const mongoose = require('mongoose')
const userController = require('./controllers/userController')
const chatController = require('./controllers/chatController')
const messageController = require('./controllers/messageController')


require('dotenv').config()
const app = express()
const port = process.env.port
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET

mongoose.connection.on('error', (err) => 
    console.log(err.message + ' is mongoDB not running?')
)
mongoose.connection.on('disconnected', () => console.log('mongoDB disconnected'))

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
})
mongoose.connection.once('open', () => {
    console.log('connected to mongoose at ' + MONGODB_URI)
})

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/api/users', userController)
app.use("/api/chats", chatController);
app.use("/api/messages", messageController);



app.listen(port, () => {
    console.log(`Server is now listening at http://localhost:${port}`)
})