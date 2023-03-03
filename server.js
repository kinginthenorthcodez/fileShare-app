const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const ioSocket = require('socket.io');
const io = new ioSocket.Server({ server: server });
//configure app to save static files
app.use(express.static(path.join(__dirname + '/public')));

//socketing
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('sender-join', (data) => {
    socket.join(data.uid);
  });
  socket.on('receiver-join', (data) => {
    socket.join(data.uid);
    socket.in(data.sender_uid).emit('init', data.uid);
  });
  socket.on('file-meta', (data) => {
    socket.in(data.uid).emit('file-meta', data.metadata);
  });
  socket.on('fs-start', (data) => {
    socket.in(data.uid).emit('fs-share', {});
  });
  socket.on('file-raw', (data) => {
    socket.in(data.uid).emit('fs-share', data.buffer);
  });
});

// app.get('/', (req, res) => {

//   res.send('Connectd');
// });
//start server at port 5000
const HTTP_PORT = 5000;

server.listen(HTTP_PORT, (address) => {
  console.log(`Server running on host: ${address} port :  ${HTTP_PORT}`);
});
