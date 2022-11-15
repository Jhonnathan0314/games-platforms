localStorage.setItem("location", "lobbie")

window.addEventListener('DOMContentLoaded', function(ev) { 
    checkPlayer()
    checkActualPlayers()
    setInterval(() => {
        checkActualPlayers()
        checkStart()
    }, 3000)
});

function checkPlayer() {
    fetch("https://games-plat-db.herokuapp.com/player/" + localStorage.getItem("idPlayer"))
    .then(res => res.json())
    .then(res => checkUsername(res))
}

function checkUsername(player) {
    if(player.username != "Esperando..."){
        cleanScreen()
    }
}

function checkStart() {
    fetch("https://games-plat-db.herokuapp.com/sesion/" + localStorage.getItem("codeSesionPlayer"))
    .then(res => res.json())
    .then(res => checkState(res))
}

function checkState(sesion) {
    if(sesion.coordinator == "Trivia P&M"){
        window.open("../../html/game_pb_mm/homepb.html", "_self")
    }else if(sesion.coordinator == "Adivina pelicula"){
        window.open("../../html/game_rp/views/main.html", "_self")
    }else if(sesion.coordinator == "Unlockfit"){
        window.open("../../html/game_tp_ss/level_one_tp_ss.html", "_self")
    }else if(sesion.coordinator == "Help me Jump"){
        window.open("../../html/game_vv/game_vv.html", "_self")
    }
}

function checkActualPlayers(){
    fetch("https://games-plat-db.herokuapp.com/player")
    .then(res => res.json())
    .then(res => showPlayers(res))
}

function showPlayers(players){
    let divPlayers = document.querySelector(".players")
    let newHTMLcode = "<p class='container_subtitle'>JUGADORES DENTRO:</p>";
    for(player of players){
        if(player.sesion.id_sesion == localStorage.getItem("codeSesionPlayer")){
            newHTMLcode += `<p class="container_text">${player.username}</p>`
        }
    }
    divPlayers.innerHTML = newHTMLcode;
}

function saveName() {
    let name = document.getElementById("username").value
    if(name != ""){
        updatePlayer(name)
    }
}

function updatePlayer(name) {
    let codeSesionPlayer = localStorage.getItem("codeSesionPlayer")
    let idPlayer = localStorage.getItem("idPlayer")
    fetch('https://games-plat-db.herokuapp.com/player/' + idPlayer + '/sesion/' + codeSesionPlayer ,{
        method: "PUT",
        body: JSON.stringify({
            "username": name,
            "totalScore": 0
        }),
        headers: {"Content-type": "application/json"}
    }).then(res => res.json())
    .then(res => 
        setTimeout(() => {
            cleanScreen()
        }, 150))
}

function cleanScreen() {
    let containerTitle = document.querySelector(".container_title");
    let inputName = document.getElementById("username");
    let saveButton = document.getElementById("save");

    containerTitle.setAttribute("hidden", "true");
    inputName.setAttribute("hidden", "true");
    saveButton.setAttribute("hidden", "true");
}

function deleteData(){
    findAllPlayerHasGames()
}

function findAllPlayerHasGames(){
    fetch("https://games-plat-db.herokuapp.com/playerhasgame")
    .then(res => res.json())
    .then(res => deletePlayerHasGames(res))
}

function deletePlayerHasGames(playerHasGames){
    for(playerHasGame of playerHasGames){
        console.log("deletePlayerHasGames: " + playerHasGame.player.sesion.id_sesion + "--" + localStorage.getItem("code"))
        if(playerHasGame.player.idPlayer == localStorage.getItem("idPlayer")){
            fetch('https://games-plat-db.herokuapp.com/playerhasgame/'+playerHasGame.idPlayerHasGame,{
                method: "DELETE",
                body: JSON.stringify({ }),
                headers: {"Content-type": "application/json"}
            }).then(res => console.log("deletePlayerHasGames"))
        }
    }
    setTimeout(() => {
        deletePlayer()
    }, 150)
}

function deletePlayer() {
    fetch('https://games-plat-db.herokuapp.com/player/'+localStorage.getItem("idPlayer"),{
        method: "DELETE",
        body: JSON.stringify({ }),
        headers: {"Content-type": "application/json"}
    }).then(res => console.log("deletePlayers"))
    window.open("../../index.html", "_self")
}