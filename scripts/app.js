const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-message");
const rooms = document.querySelector(".chat-rooms")
const buttons = document.querySelectorAll(".chat-rooms .btn")
const chatWindow = document.querySelector(".chat-window")


newChatForm.addEventListener("submit", e=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(()=> newChatForm.reset())
    .catch(err=> console.log(err));
});

newNameForm.addEventListener("submit", e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);

    newNameForm.reset();

    updateMssg.innerText = `Your name was update to ${newName}`
    setTimeout(()=> updateMssg.innerText = "", 3000)
});

rooms.addEventListener("click", e => {
    if(e.target.classList.contains("btn")){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute("id"));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

rooms.addEventListener("click",e=>{
    if(e.target.classList.contains("btn")){
        buttons.forEach(element=>{
           element.classList.remove("btn-on")
        })
        e.target.classList.add("btn-on")        
    }
})

const room = "general"
document.querySelector(`#${room}`).classList.add("btn-on")

const username = localStorage.getItem("username") ? localStorage.getItem("username") : "anonymous";

const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom(room, username);

chatroom.getChats(data => chatUI.render(data));