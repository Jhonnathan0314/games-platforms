localStorage.setItem("location", "games")

let inputCode = document.getElementById("inputCode")
inputCode.value = localStorage.getItem("code")

findAllGames()

function findAllGames() {
    fetch("https://games-plat-db.herokuapp.com/game")
    .then(res => res.json())
    .then(res => printGames(res))
}

function printGames(games) {
    let divGames = document.querySelector(".games")
    let newHTMLcode = "";
    for(game of games){
        if(game.name != "default"){
            newHTMLcode += `<div class="button" onclick="vibrate(); startGame('${game.name}')">
                                <input type="button" value="${game.name}" id="${game.idGame}">
                            </div>`
        }
    }
    newHTMLcode += `<div class="button" onclick="vibrate(); endGame()">
                        <input type="button" value="FINALIZAR">
                    </div>`
    divGames.innerHTML = newHTMLcode;
}

function startGame(nameGame){
    if(nameGame == "Trivia P&M"){
        fetch('https://games-plat-db.herokuapp.com/sesion/' + localStorage.getItem("code"),{
            method: "PUT",
            body: JSON.stringify({ 
                "coordinator": "Trivia P&M"
             }),
            headers: {"Content-type": "application/json"}
        }).then(res => 
            setTimeout(() => {
                localStorage.setItem("role", "admin")
                window.open("../../html/game_pb_mm/homepb.html", "_self")
            }, 300))
    }else if(nameGame == "Adivina pelicula"){
        fetch('https://games-plat-db.herokuapp.com/sesion/' + localStorage.getItem("code"),{
            method: "PUT",
            body: JSON.stringify({ 
                "coordinator": "Adivina pelicula"
             }),
            headers: {"Content-type": "application/json"}
        }).then(res => 
            setTimeout(() => {
                localStorage.setItem("role", "admin")
                window.open("../../html/game_rp/views/main.html", "_self")
            }, 300))
    }else if(nameGame == "Unlockfit"){
        fetch('https://games-plat-db.herokuapp.com/sesion/' + localStorage.getItem("code"),{
            method: "PUT",
            body: JSON.stringify({ 
                "coordinator": "Unlockfit"
             }),
            headers: {"Content-type": "application/json"}
        }).then(res => 
            setTimeout(() => {
                localStorage.setItem("role", "admin")
                window.open("../../html/game_tp_ss/level_one_tp_ss.html", "_self")
            }, 300))
    }
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

function endGame() {
    window.open("../../html/coordinador_jf_wr/results.html", "_self")
}