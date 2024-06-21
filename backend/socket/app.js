const { Server } = require("socket.io");
const mongoose = require('./databaseConnection/mongo')
const {receiveMessage} = require('./controller/chatController')
const io = new Server(5001,{
  cors:{
    origin:'http://localhost:3000'
  }
});
let connectedUsers = {};
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('authenticate', (userId) => {
      console.log(`User authenticated with ID: ${userId}`);
      socket.userId = socket.id;
      connectedUsers[userId] = socket.id; 
      console.log('Hello I am connected users',connectedUsers)
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
  });



