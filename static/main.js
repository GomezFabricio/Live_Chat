// Espera a que el contenido HTML del documento esté completamente cargado antes de ejecutarse
document.addEventListener('DOMContentLoaded', function() {
    // Obtén referencias a elementos HTML importantes en la página
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const usernameInput = document.getElementById('username');
    const joinButton = document.getElementById('join-button');
    const chatContainer = document.getElementById('chat-container');
    
    // Variable para almacenar el nombre de usuario actual
    let username = '';

    // Conecta el cliente al servidor de Socket.IO
    const socket = io.connect('http://' + document.domain + ':' + location.port);

    // Agrega un event listener al botón "Unirse" para establecer el nombre de usuario
    joinButton.addEventListener('click', function() {
        username = usernameInput.value;
        if (username) {
            document.getElementById('username-form').style.display = 'none'; //Oculatamos formulario de usuario
            chatContainer.style.display = 'block'; // Mostramos el chat
            socket.emit('join', { username });
            usernameInput.value = '';
        }
    });

    // Agrega un event listener al botón "Enviar"
    sendButton.addEventListener('click', function() {
        const message = messageInput.value;
        if (message) {
            socket.emit('message', { sender: username, content: message });
            messageInput.value = '';
        }
    });

    // Escucha eventos de tipo 'message' que recibe del servidor
    socket.on('message', function(data) {
        const sender = data.sender;
        const content = data.content;
        const listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(sender + ': ' + content));
        chatMessages.appendChild(listItem);
    });
});
