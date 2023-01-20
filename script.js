/*globais*/
let userName, usingName;

/* Reload de mensagens e Status de usuário */
let reloadStatus, reloadUsers


function displayChat(){
    userName = prompt("Digite o seu nome de usuário.")
// registrar usuário - carregar mensagens - carregar usuarios
    registerUser();
    loadMessages();
  //  loadUsers();
}

function sendMessage(){
    const messageText = document.querySelector(".input-message").value;
    const messageToSent = {from: userName, to: usingName, msg: messageText, type:"message" };
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messageToSent);
    promise.catch(errorMessage);
    promise.then(messageSent)
    
}
function messageSent(response){
    console.log(response);
}
function errorMessage(error){
    console.log(error)
}

function loadMessages(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(displayMessages);
}

function displayMessages(response){
    const messages = response.data;
    console.log(response);
    const list = document.querySelector('.mid');
    list.innerHTML = ''
    for(let i = 0 ; i <messages.length; i++){

        let message = messages[i];
        let templateMessage;
        if(message.to === "Todos"){ 
            
            templateMessage =
        `
            <li data-test="message" class="to-all message normal">
            <span class="hour">(${message.time})</span>
            <span class="name">${message.from}</span>
            <span>para </span>
            <span class="send-to">${message.to}</span>
            <span>: ${message.text}</span>
            </li>
        `;
        list.innerHTML += templateMessage;
    } else if(message.status === "status"){
            templateMessage = 
            `
            <li data-test="message" class="left-chat message status">
                <span class="hour">${message.time}</span>
                <span class="name">${message.from}</span>
                <span>:${message.text}</span>
            </li>
            `
     } else if (message.to !== "Todos"){
            templateMessage =
            `
            <li data-test="message" class="private message">
                <span class="hour">(${message.time})</span>
                <span class="name">${message.from}</span>
                <span> reservadamente para </span>
                <span class="send-to">${message.to}</span>
                <span>: ${message.text}</span>
            </li>
            `
     }
    }
}

function registerUser(){
    const newUser = {name: userName};
    const promise = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants/`, newUser);
    promise.catch(errorPost);
    promise.then(sentPost);
    
}

function errorPost(response){
    console.log(response)
}

function sentPost(error){
    console.log(error)
}


displayChat()