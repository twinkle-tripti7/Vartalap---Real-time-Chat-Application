const socket = io('http://localhost:9100')

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInput')
const messageContainer = document.querySelector(".message__area")

const notificationSound = new Audio('snd_fragment_retrievewav-14728.mp3');


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageElement.textContent = message;
    messageContainer.append(messageElement);
    if (position == 'left') {
        notificationSound.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = ''
})

const username = prompt("Enter your name to join");
socket.emit('new-user-joined', username);

socket.on('user-joined', username => {
    append(`${username} joined the chat`, 'right');
})

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left');
})

socket.on('left', username => {
    append(`${username} left the chat`, 'left');
})


