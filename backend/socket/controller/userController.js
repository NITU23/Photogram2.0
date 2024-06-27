const mongoose = require("../databaseConnection/mongo");
module.exports = {
    findUser : async(searchValue)=>{
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
}