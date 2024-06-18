const { Server } = require("socket.io");
const mongoose = require('./databaseConnection/mongo')
const {receiveMessage} = require('./controller/chatController')
const io = new Server(5001,{
  cors:{
    origin:'http://localhost:3000'
  }
});

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('message',async (data)=>{
      await receiveMessage(data)
      socket.emit('Response',data)
    })
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });



