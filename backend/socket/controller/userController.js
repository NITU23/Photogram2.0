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
    },
    followUser : async(data)=>{
      try{
        console.log('234',data)
        const email = data.email;
        const following = data.following
        const realUseremail = data.username.email;
        const userCollection = mongoose.collection('users');
        let user = await userCollection.findOne({email:email},{ projection: { _id:1 }});
        let realUser = await userCollection.findOne({email:realUseremail})
        if(following){
          await userCollection.updateOne({_id : new ObjectId(realUser._id)}, { $push: { followings: user._id } });
          await userCollection.updateOne({_id : new ObjectId(user._id)}, { $push: { followers: realUser._id } });
        }
        else {
          await userCollection.updateOne({_id : new ObjectId(realUser._id)}, { $pull: { followings: user._id } });
          await userCollection.updateOne({_id : new ObjectId(user._id)}, { $pull: { followers: realUser._id } });
        }
        console.log(`You are now ${following ? 'following' : 'unfollowing'} this user.`)
        return following
      }
      catch(err){
        console.log('Error While Following User',err)
      }
    }

}