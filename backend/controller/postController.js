const Post = require('../model/postModel')
const User = require('../model/userModel')
module.exports = {

    getAllImages : async(req,res)=>{

     res.status(200).send('567890')
    },

    getUserImage : async(req,res)=>{
       try {
            const file = await File.findOne({ filename: req.params.filename });
            if (!file) {
              return res.status(404).send('File not found');
            }
            res.sendFile(path.resolve(file.filepath));
          } catch (err) {
            res.status(500).send(err.message);
          }
    },
    createPost : async(req,res)=>{
      try {
        let username = req.username;
        let findUser = await User.findOne({ username: username });
        const newFile = new Post({
            file: req.body.file,
            location: req.body.location,
            caption: req.body.caption
        });
    
        const savedFile = await newFile.save();
        findUser.posts.push(savedFile._id);
        await findUser.save();
    
        res.status(200).send(savedFile);
    } catch (err) {
        console.log('Error while creating Post', err);
        res.status(400).json({message:'Error while Creating Post'});
    }
  
    }
}