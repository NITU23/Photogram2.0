const Post = require('../model/postModel')
const User = require('../model/userModel')
module.exports = {

  getAllImages: async (req, res) => {
    try {
      let allPosts = await Post.find()
      let data = [];
      for (let item of allPosts) {
        let findUser = await User.findOne({ username: item.username })
        data.push({ username: item.username, file: item.file, caption: item.caption, location: item.location, date: item.createdAt, profilePic: findUser.profilePicture, postid: item.id, realUser: req.username })
      }
      console.log('All Images fetched successfully.')
      res.status(200).send(data)
    }
    catch (err) {
      console.log('Error While Getting Post', err)
      res.status(400).send({ message: 'Error While Getting Post' })
    }
  },

  getUserImage: async (req, res) => {
    try {
      const file = await File.findOne({ filename: req.params.filename });
      if (!file) {
        return res.status(404).send('File not found');
      }
      console.log('User Image Fetched Successfully.')
      res.sendFile(path.resolve(file.filepath));
    } catch (err) {
      console.log('Error While getting user Image', err)
      res.status(500).send(err.message);
    }
  },
  createPost: async (req, res) => {
    try {
      let username = req.username;
      const newFile = new Post({
        file: req.body.file,
        location: req.body.location,
        caption: req.body.caption,
        username : username
    });
    const savedFile = await newFile.save();

      const postId = savedFile._id;
      await User.updateOne(
        { username: username },
        { $push: { posts: postId } }
      );
      console.log('Post Created Successfully.')
      res.status(200).send(savedFile);
    } catch (err) {
      console.log('Error while creating Post', err);
      res.status(400).send({ message: 'Error while Creating Post.' });
    }

  },
  fetchUserPosts: async (req, res, next) => {
    try {
      let username = req.query.username;
      let findUser = await User.findOne({ email: username });
      let userPostsId = findUser.posts;
      let userPosts = [];
      for (let item of userPostsId) {
        let getPost = await Post.findById(item.id)
        userPosts.push({ username: getPost.username, caption: getPost.caption, location: getPost.location, file: getPost.file, date: getPost.createdAt })
      }
      res.status(200).send(userPosts)
    }
    catch (err) {
      console.log('Error While Fetching user posts', err)
      res.status(401).send({ message: 'Error While fetching user posts' })
    }
  },
  deletePost: async (req, res) => {
    try {
      let username = req.username;
      let postid = req.query.postid;
      await User.updateOne(
        { username: username },
        { $pull: { posts: { _id: postid } } }
      );
      await Post.findByIdAndDelete(postid);
      console.log('Post Successfully Deleted')
      res.status(200).send({ message: 'Post Successfully deleted' })
    }
    catch (err) {
      console.log('Error While Deleting Post', err)
      res.status(400).send({ message: "Error While Deleting Your Post" })
    }
  }
}