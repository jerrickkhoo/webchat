const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema ({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    img:{
        type: String,
        default: 'https://st4.depositphotos.com/14903220/22197/v/1600/depositphotos_221970610-stock-illustration-abstract-sign-avatar-icon-profile.jpg'
    }
}, 
{timeStamp:true}
)

const User = mongoose.model('User',userSchema)
module.exports = User