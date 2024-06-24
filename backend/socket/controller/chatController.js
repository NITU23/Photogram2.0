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
    getPreviousMessages : async(sender,receiver) =>{
        const userCollection = mongoose.collection('users');
        const user1 = await userCollection.findOne({email: sender});
        const user2 = await userCollection.findOne({email:receiver});
        let receiverChat = user1.chats[receiver];
        let senderChat = user2.chats[sender];
        let finalChatArray  =[];
        for(let item of receiverChat){
             finalChatArray.push({sender:'receiver',message :item.text,time:item.timestamp.toLocaleString()})
        }
        for(let item of senderChat){
            finalChatArray.push({sender:'you',message :item.text,time:item.timestamp.toLocaleString()})
       }
      finalChatArray = finalChatArray.sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
      });
     return finalChatArray;
    } 

};
