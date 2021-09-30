// Import the functions you need from the SDKs you need

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAXzzZml-bTHhvyifLfN7pnNw1cHDwH2WM",

  authDomain: "chat-room-b7455.firebaseapp.com",

  databaseURL: "https://chat-room-b7455-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "chat-room-b7455",

  storageBucket: "chat-room-b7455.appspot.com",

  messagingSenderId: "351974343357",

  appId: "1:351974343357:web:6450fcf76465401b59add4"

};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);

console.log(firebase)

var inputName = sessionStorage.getItem('username')
var inputMessage = document.getElementById('input-message')

var chatBox = document.getElementById('chatbox')

console.log(inputName, inputMessage)

document.addEventListener('keypress', keyPressed)

var currentRoom = sessionStorage.getItem('currentRoom')

var sendName
var sendMessage
var sendTime

//get data from firebase when page starts
firebase.database().ref(currentRoom).child('message').on('child_added', function(snapshot){
    console.log(snapshot.val())
    var nameVal = snapshot.val().name;  //string
    var msgVal = snapshot.val().msg;    //string
    var timeVal = snapshot.val().time;

    //create element when firebase gets new child

    var createChatBox = document.createElement('div')
    var createChatName = document.createElement('h3')
    var createChatMessage = document.createElement('p')
    var createChatTime = document.createElement('p')

    if(nameVal == inputName){
        createChatBox.classList.add('chat-right')
    } else createChatBox.classList.add('chat-left')

    createChatBox.classList.add('chat-box')
    var createBreak = document.createElement('br')

    createChatName.innerHTML = nameVal
    createChatMessage.innerHTML = msgVal
    createChatTime.innerHTML = timeVal

    createChatTime.classList.add('time-text')

    createChatBox.append(createChatName)
    createChatBox.append(createChatMessage)
    createChatBox.append(createChatTime)

    chatBox.append(createChatBox)
    chatBox.append(createBreak)

    chatBox.scrollTo(0, chatBox.scrollHeight)
})

function keyPressed(evt){
    if(evt.keyCode == 13){
        sendInput()
        inputMessage.value = ""
    }
}

function sendInput(){
    if(inputMessage.value != ''){
        
        sendName = inputName

        sendMessage = inputMessage.value
        // inputName.value = ""
        inputMessage.value = ""
        
        console.log(`Name : ${sendName}, Message : ${sendMessage}`)

        var currentTime = new Date()

        var newTime = currentTime.toTimeString().substr(0,8)
        var newDate = currentTime.toISOString().substr(0,10)
        
        var sendTime = newTime +', '+ newDate
        console.log(sendTime)
    }

    //pushing data and store in database
    firebase.database().ref(currentRoom).child('message').push({
        name : sendName,
        msg : sendMessage,
        time : sendTime
    })


}


function goBack(){
    window.location.href = 'roomLobby.html'
}