localStorage.setItem("location", "create")

let inputCode = document.getElementById("inputCode")
inputCode.value = localStorage.getItem("code")

window.addEventListener('DOMContentLoaded', function(ev) { 
    checkActualPlayers()
    setInterval(() => {
        checkActualPlayers()
    }, 3000)
});

function checkActualPlayers(){
    fetch("https://games-plat-db.herokuapp.com/player")
    .then(res => res.json())
    .then(res => showPlayers(res))
}

function showPlayers(players){
    let divPlayers = document.querySelector(".players")
    let newHTMLcode = "<p class='container_subtitle'>JUGADORES DENTRO:</p>";
    for(player of players){
        if(player.sesion.id_sesion == localStorage.getItem("code")){
            newHTMLcode += `<p class="container_text">${player.username}</p>`
        }
    }
    divPlayers.innerHTML = newHTMLcode;
}

function goGames() {
    window.open("../../html/coordinador_jf_wr/games.html", "_self")
}

function deleteData(){
    findAllSesionHasGames()
}

function findAllSesionHasGames(){
    fetch("https://games-plat-db.herokuapp.com/sesionhasgame")
    .then(res => res.json())
    .then(res => deleteSesionHasGames(res))
}

function deleteSesionHasGames(sesionHasGames){
    for(sesionHasGame of sesionHasGames){
        if(sesionHasGame.sesion.id_sesion == localStorage.getItem("code")){
            fetch('https://games-plat-db.herokuapp.com/sesionhasgame/'+sesionHasGame.idSesionHasGame,{
                method: "DELETE",
                body: JSON.stringify({ }),
                headers: {"Content-type": "application/json"}
            }).then(res => console.log("deleteSesionHasGames"))
        }
    }
    setTimeout(() => {
        findAllPlayerHasGames()
    }, 150)
}

function findAllPlayerHasGames(){
    fetch("https://games-plat-db.herokuapp.com/playerhasgame")
    .then(res => res.json())
    .then(res => deletePlayerHasGames(res))
}

function deletePlayerHasGames(playerHasGames){
    for(playerHasGame of playerHasGames){
        console.log("deletePlayerHasGames: " + playerHasGame.player.sesion.id_sesion + "--" + localStorage.getItem("code"))
        if(playerHasGame.player.sesion.id_sesion == localStorage.getItem("code")){
            fetch('https://games-plat-db.herokuapp.com/playerhasgame/'+playerHasGame.idPlayerHasGame,{
                method: "DELETE",
                body: JSON.stringify({ }),
                headers: {"Content-type": "application/json"}
            }).then(res => console.log("deletePlayerHasGames"))
        }
    }
    setTimeout(() => {
        findAllPlayers()
    }, 150)
}

function findAllPlayers(){
    fetch("https://games-plat-db.herokuapp.com/player")
    .then(res => res.json())
    .then(res => deletePlayers(res))
}

function deletePlayers(players) {
    for(player of players){
        console.log("deletePlayerHasGames: " + player.sesion.id_sesion + "--" + localStorage.getItem("code"))
        if(player.sesion.id_sesion == localStorage.getItem("code")){
            fetch('https://games-plat-db.herokuapp.com/player/'+player.idPlayer,{
                method: "DELETE",
                body: JSON.stringify({ }),
                headers: {"Content-type": "application/json"}
            }).then(res => console.log("deletePlayers"))
        }
    }
    setTimeout(() => {
        deleteSesion()
    }, 150)
}

function deleteSesion() {
    fetch('https://games-plat-db.herokuapp.com/sesion/'+localStorage.getItem("code"),{
        method: "DELETE",
        body: JSON.stringify({ }),
        headers: {"Content-type": "application/json"}
    }).then(res => console.log("deleteSesion"))
    setTimeout(() => {
        window.open("../../index.html", "_self")
    }, 1000)
}