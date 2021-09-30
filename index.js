var nameInput = document.getElementById('name-input')

window.addEventListener('keypress', keyPressed)

nameInput.value = ''

function keyPressed(evt){
    if(evt.keyCode == 13){
        enterChatroom()
    }
}

function enterChatroom(){
    if(nameInput.value != ''){
        sessionStorage.setItem('username', nameInput.value)

        window.location.href = 'roomLobby.html'
    }
}

function goBack(){
    window.location.href = 'index.html'
}