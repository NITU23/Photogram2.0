const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const chatSchema = new mongoose.Schema({
    receiver: {
        type: String,
        required: true,
    },
    messages: [messageSchema],
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
        minlength: 6,
    },
    posts: [
        {
            post_id: String,
        },
    ],
    chats: {
        type: Map,
        of: [chatSchema],
    },
    profilePicture: {
        type: String,
    },
    followings:[{
        type: mongoose.Schema.Types.ObjectId,
      }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
