const mongoose = require("../databaseConnection/mongo");

module.exports = {
    receiveMessage: async (text, username, receiver) => {
        try {
            const userCollection = mongoose.collection('users');
            const user = await userCollection.findOne({ email: username });
            const message = { text, timestamp: new Date() };
            if (user?.chats && user?.chats[receiver]) {
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
    getPreviousMessages : async(sender,receiver) =>{
        console.log('I am getting previous messge')
        const userCollection = mongoose.collection('users');
        const user1 = await userCollection.findOne({email: sender});
        const user2 = await userCollection.findOne({email:receiver});
        let receiverChat={},senderChat={}
        if(user1 && user1.chats && user1.chats[receiver]){
            receiverChat = user1.chats[receiver];
        }
        if(user2 && user2.chats && user2.chats[sender]){
            senderChat = user2.chats[sender];
        }
        let finalChatArray  =[];
        let keys = Object.keys(receiverChat);
        for (let key of keys) {
            let item = receiverChat[key];
            finalChatArray.push({ sender: 'receiver', message: item.text, time: item.timestamp });
        }
        let keys2 = Object.keys(senderChat);
        for (let key of keys2) {
            let item = senderChat[key];
            finalChatArray.push({ sender: 'you', message: item.text, time: item.timestamp });
        }
        console.log('Sent previous messages')
      finalChatArray = finalChatArray.sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
      });
     return finalChatArray;
    }

};
