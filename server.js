const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Дозволяє підключатися з будь-якого джерела
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Користувач підключився');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Користувач відключився');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер чату запущено на порту ${PORT}`);
});
