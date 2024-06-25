const mongoose = require("../databaseConnection/mongo");
module.exports = {
    findUser : async(searchValue)=>{
        console.log('Hello');
        const userCollection = mongoose.collection('users');
        const regex = new RegExp(`^${searchValue}`, 'i');
        const query = { username: { $regex: regex } };
        const users = await userCollection.find(query).toArray();
        return users;

    }
}