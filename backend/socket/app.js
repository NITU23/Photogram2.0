const { Server } = require("socket.io");
const mongoose = require('./databaseConnection/mongo')
const {receiveMessage} = require('./controller/chatController')
const io = new Server(5001,{
  cors:{
    origin:'http://localhost:3000'
  }
});
const connectedUsers = {};
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('authenticate', (userId) => {
      console.log(`User authenticated with ID: ${userId}`);
      socket.userId = userId;
      connectedUsers[userId] = socket.id; 
  });
    socket.on('message',({  text,username,receiver }) => {
      const recipientSocketId = connectedUsers[receiver];
      if (recipientSocketId) {
          io.to(recipientSocketId).emit('private message', {
              senderId: socket.userId,
              message: text
          });
      } else {
          console.log(`User ${username} is not connected`);
      }
  })
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });



