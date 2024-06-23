const mongoose = require("../databaseConnection/mongo");

module.exports = {
    receiveMessage: async (text, username, receiver) => {
        try {
            const userCollection = mongoose.collection('users');
            const user = await userCollection.findOne({ email: username });
            const message = { text, timestamp: new Date() };
            if (user.chats && user.chats[receiver]) {
                user.chats[receiver].push(message);
            } else {
                if (!user.chats) {
                    user.chats = {};
                }
                else if(user.chats[receiver]) {
                    user.chats[receiver] = {...message, message};
                }
                else {
                      user.chats[receiver] = [message];
                }
            }
            await userCollection.updateOne(
                { email: username },
                { $set: { chats: user.chats } }
            );
            console.log('Chat saved successfully');
        } catch (error) {
            console.error('Error While receiving message:', error);
        }
    },
};
