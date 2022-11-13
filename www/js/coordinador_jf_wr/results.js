findAllPlayers()

function findAllPlayers() {
    fetch("https://games-plat-db.herokuapp.com/player")
    .then(res => res.json())
    .then(res => printPlayers(res))
}

function printPlayers(players) {
    let divPlayers = document.querySelector(".games")
    let newHTMLcode = "";
    players.sort(function (a, b) {
        if (a.totalScore < b.totalScore) {
          return 1;
        }
        if (a.totalScore > b.totalScore) {
          return -1;
        }
        // a must be equal to b
        return 0;
    });
    for(player of players){
        if(player.sesion.id_sesion == localStorage.getItem("code")){
            newHTMLcode += `<div class="button" onclick="vibrate()">
                            <input type="button" value="${player.username}: ${player.totalScore}">
                        </div>`
        }
    }
    divPlayers.innerHTML = newHTMLcode;
}

function deleteData(){
    console.log("holi")
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
    }).then(res => 
        setTimeout(() => {
            // window.open("../../index.html")
        }, 150))
}