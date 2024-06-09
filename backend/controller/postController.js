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
        try{
            let username = req.username;
          try {
                const newFile = new Post({
                  filename: req.file.filename,
                  filepath: req.file.path,

                });
                const file = await newFile.save();
                res.status(201).send(file);
              } catch (err) {
                res.status(500).send(err.message);
              }
        }
        catch(err){
            console.log('Error while creating Post',err);
            res.status(400).send('Error While Sending Post')
        }

    }
}