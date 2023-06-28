const express = require("express");
const db = require('./db/index');
const { addMessage, getMessages } = require("./controllers/messageController");
const { Server } = require("socket.io");
const http = require('http');

const app = express();
const mainServer = http.createServer(app);
const io = new Server(mainServer);

let users = 0;
io.on('connection', async (socket) => {
    users++;
    io.emit('new user', users);
    const messages = await getMessages();
    socket.emit('all messages', messages);
    socket.on('new message', (message) => {
        addMessage(message);
        io.emit('new message', message);
    })
    socket.on('disconnect', () => {
        users--;
        io.emit('new user', users);
    })
})


db.on('connected', () => {
    console.log('DB connected');
});
db.on('error', () => {
    console.log('DB error');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static('public'));

mainServer.listen(8000, () => {
    console.log('Server is running');
});