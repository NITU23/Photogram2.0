const mongoose = require('mongoose');

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
    ref: 'User'
  }]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
