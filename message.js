let websocket;
const id = Math.floor(Math.random() * 10000) + 1;


window.addEventListener("DOMContentLoaded", () => {

    const websocket = new WebSocket("wss://websocket-back-chat.onrender.com");

    const input = document.getElementById('messageInput');

    const button = document.getElementById('messageButton')
    
    input.addEventListener("keydown", (event) => {
        if(event.key === "Enter") {
            sendMessage(websocket);
        }
    })

    button.addEventListener("click", () => {
        sendMessage(websocket);
    })

    receivMessages(websocket)
});

function showMessage(message_receiv, id_receiv, name_receiv){
    const message = message_receiv;
    

    const chatMessages = document.getElementById('chatMessages');
    const newMessage = document.createElement('div');
    newMessage.className = 'message user';


    if (id_receiv === id){
        newMessage.classList.add('user');
        newMessage.textContent = message;
    } else {
        newMessage.classList.add('other');

        const name = name_receiv;
        const nameTag = document.createElement('div');
        nameTag.className = 'message-name';
        nameTag.textContent =  name + " #" + id_receiv;

        newMessage.appendChild(nameTag);

        const textNode = document.createTextNode(message_receiv);
        newMessage.appendChild(textNode);
    }

    chatMessages.appendChild(newMessage);

    chatMessages.scrollTop = chatMessages.scrollHeight;
    
}

function sendMessage(websocket){
    const chatName = document.getElementById('nameInput');
    const name = chatName.value;

    const input = document.getElementById('messageInput');
    const message = input.value;
    if (message.trim() === "") return;

    input.value = '';

    const messageData = {type: 'message',id: id,name: name, content: message};
    websocket.send(JSON.stringify(messageData));
}

function receivMessages(websocket){
    websocket.addEventListener("message", ({data}) => {
        const event = JSON.parse(data);

        showMessage(event.content, event.id, event.name);
    });
}
