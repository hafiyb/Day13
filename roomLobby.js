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

document.getElementById('spanName').innerHTML = sessionStorage.getItem('username')

var index = 1

firebase.database().ref('room').on('child_added', function(snapshot){
    var roomName = snapshot.val().room
    var createDiv = document.createElement('div')
    createDiv.classList.add('room-item')
    createDiv.onclick = enterRoom
    var createRoomName = document.createElement('h1')
    createRoomName.innerHTML = roomName

    createDiv.append(createRoomName)

    document.getElementById('room-container').append(createDiv)

    index++;
})

var nameOfRoom = document.getElementById('name-input')

function createRoom(){
    if(nameOfRoom.value != ''){
        firebase.database().ref('room').push({
            room: nameOfRoom.value
        })
    }
    
}

function enterRoom(){
    console.log(this.querySelector('h1').innerHTML)
    sessionStorage.setItem('currentRoom', this.querySelector('h1').innerHTML)
    window.location.href = 'chat.html'
}

function goBack(){
    window.location.href = 'index.html'
}