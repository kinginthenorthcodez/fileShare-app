const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);

//configure app to use static files
app.use(express.static(path.join(__dirname + '/public')));

//start server at port 5000
const HTTP_PORT = 5000;

server.listen(HTTP_PORT, (address) => {
  console.log(`Server running on host: ${address} port :  ${HTTP_PORT}`);
});
