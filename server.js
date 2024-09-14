const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
const server = http.createServer(app);
// const io = socketIo(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });