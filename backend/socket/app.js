const { Server } = require("socket.io");
const express = require('express');
const { createServer } = require('node:http');
const app = express();
const server = createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
io.on('connection', (socket) => {
    console.log('a user connected');
  });

server.listen(5000, () => {
  console.log('server running at Port 5000');
});