const mongoose = require("../databaseConnection/mongo");
const { ObjectId } = require('mongodb');
module.exports = {
    findUser : async(searchValue)=>{
      try{
        const userCollection = mongoose.collection('users');
        const regex = new RegExp(`^${searchValue}`, 'i');
        const query = {
            $or: [
              { username: { $regex: regex } },
              { firstName: { $regex: regex } },
              { lastName: { $regex: regex } },
              { email: { $regex: regex } },
            ],
          };
        const users = await userCollection.find(query).toArray();
        console.log('Sent users list')
        return users;
      }
      catch(err){
        console.log('Error While searching users',err)
      }
       
    },
    likedPost : async({postid,liked,user})=>{
      const postCollection = mongoose.collection('posts');
      const userCollection = mongoose.collection('users');
      let userid = await userCollection.findOne({username : user},{ projection: { _id:1 }})
      if(liked){
        await postCollection.updateOne(
          { _id: new ObjectId(postid) },
          { $push: { likedBy: userid } }
        );
        console.log('Post has been liked.')
      }
      else {
        await postCollection.updateOne(
          { _id: new ObjectId(postid) },
          { $pull: { likedBy: userid } }
        );
        console.log('Post has been unliked.')
      }
    }

}