const { Server } = require("socket.io");
const mongoose = require('./databaseConnection/mongo')

const io = new Server(5001,{
  cors:{
    origin:'http://localhost:3000'
  }
});

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('message',(data)=>{
      console.log("Getting message from client",data)
      socket.emit('Response',data)
    })
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });



