const  mongoose  = require("mongoose");

const Schema = mongoose.Schema;

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
      post_id : String
    }
  ],
  profilePicture:{
    type : String
  }
});

const User = mongoose.model("User", userSchema);
module.exports  = User;