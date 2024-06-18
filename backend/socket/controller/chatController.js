const mongoose = require('../databaseConnection/mongo')
module.exports = {
    receiveMessage : async(data) =>{
     console.log('I am getting messages',data)
    }
}