const { Server } = require("socket.io");
const mongoose = require('./databaseConnection/mongo')
const {receiveMessage,getPreviousMessages} = require('./controller/chatController')
const {findUser, likedPost,followUser} = require('./controller/userController')
require('dotenv').config()
const PORT = process.env.port || 5001 ;
const io = new Server(PORT,{
  cors:{
    origin:'*'
  }
});
let connectedUsers = {};
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('authenticate', (userId) => {
      console.log(`User authenticated with ID: ${userId}`);
      socket.userId = socket.id;
      connectedUsers[userId] = socket.id;
      console.log('I am connected users',connectedUsers)
  });
    socket.on('message',async ({  text,username,receiver }) => {
    const recipientSocketId = connectedUsers[receiver];
    if (recipientSocketId) {
        io.emit('private message', {
            senderId: socket.userId,
            message: text,
            sender : username,
            receiver : receiver
        });
        await receiveMessage(text,username,receiver)
    } else {
        console.log(`User ${username} (${receiver}) is not connected or socket ID not found`);
    }
});

    socket.on('disconnect', () => {
      console.log('User disconnected');
      connectedUsers = Object.fromEntries(
          Object.entries(connectedUsers).filter(([key, value]) => value !== socket.id)
      );
    });

    socket.on('getPreviousMessages',async ({sender,receiver})=>{
     let previousMessages =  await getPreviousMessages(sender,receiver);
     socket.emit('previousMessages',previousMessages)
    })
    socket.on('searchUser',async (searchValue)=>{
      let users = await findUser(searchValue);
      socket.emit('searchedUsers',users)
    }),
    socket.on('searchUserChat',async (searchValue)=>{
      let users = await findUser(searchValue);
      socket.emit('searchedUsersChat',users)
    }),

    socket.on('like',async(data)=>{
        await likedPost(data)
    })
    socket.on('followUser',async(data)=>{
      console.log('I am followUser')
     const resp =  await followUser(data);
     socket.emit('followedUser',resp)
    })
  });



