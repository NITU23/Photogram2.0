const mongoose = require('../databaseConnection/mongo')
module.exports = {
    receiveMessage : async(text,username,receiver) =>{
     console.log('I am getting messages',text,username,receiver)
     let userCollection = await mongoose.collection('User');
    
    
    }
}