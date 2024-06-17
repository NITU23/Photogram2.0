const { Server } = require("socket.io");

const io = new Server(5000,{
  cors:{
    origin:'http://localhost:3000'
  }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('msg',(data)=>{
      console.log("Hello I am callback function",data)
      socket.emit('welcome','Msg from server')
    })
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });



