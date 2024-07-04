const mongoose = require('mongoose');
const User = require('./userModel')

const postSchema = new mongoose.Schema({
  file: {
    type: Array,
    required: true,
  },
  username: {
    type: String,
  },
  location: {
    type: String,
  },
  caption: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  }],
  comments: [{
    object_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
