const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    console.log('Користувач підключився');

    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg); // Розсилка всім
    });

    socket.on('disconnect', () => {
        console.log('Користувач відключився');
    });
});

server.listen(3000, () => {
    console.log('Сервер чату запущено на порту 3000');
});