const socket = io();
const usersOnline = document.querySelector('.online');
const form = document.querySelector('#form');
const input = form.querySelector('input');
const messages = document.querySelector('#messages');

socket.on('new user', (users) => {
    usersOnline.textContent = users;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if(message.length > 0){
        socket.emit('new message', message);
        input.value = '';
    }
})

socket.on('new message', (message) => {
    const li = document.createElement('li');
    li.textContent = message;
    messages.prepend(li);
});
socket.on('all messages', (msgs) => {
    msgs.forEach(message => {
        const li = document.createElement('li');
        li.textContent = message.text;
        messages.prepend(li);
    });
});