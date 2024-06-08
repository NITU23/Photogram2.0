const  mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  img : {
    type:String,
    required : true,
  },
  caption : {
    type: String
  },
  location : {
    type:String
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports  = Post;
