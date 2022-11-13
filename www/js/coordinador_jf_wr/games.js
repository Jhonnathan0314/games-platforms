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
    divGames.innerHTML = newHTMLcode;
}

function startGame(nameGame){
    if(nameGame == "Trivia P&M"){
        window.open("../../html/game_pb_mm/homepb.html", "_self")
    }
}

function deleteData() {
    fetch("https://games-plat-db.herokuapp.com/sesionhasgame")
    .then(res => res.json())
    .then(res => deleteSesionHasGames(res))
}

function deleteSesionHasGames(allSesionHasGames) {
    let code = localStorage.getItem("code")
    for(sesionHasGame of allSesionHasGames) {
        if(sesionHasGame.sesion.id_sesion == code){
            console.log('https://games-plat-db.herokuapp.com/sesionhasgame/' + sesionHasGame.idSesionHasGame)
            fetch('https://games-plat-db.herokuapp.com/sesionhasgame/' + sesionHasGame.idSesionHasGame,{
                method: "DELETE",
                body: JSON.stringify({ }),
                headers: {"Content-type": "application/json"}
            }).then(res => 
                setTimeout(() => {
                    deleteSesion()
                }, 300))
        }
    }
}

function deleteSesion(){
    let code = localStorage.getItem("code")
    fetch('https://games-plat-db.herokuapp.com/sesion/'+code,{
        method: "DELETE",
        body: JSON.stringify({ }),
        headers: {"Content-type": "application/json"}
    }).then(res => 
        setTimeout(() => {
            window.open("../../index.html", "_self")
        }, 300))
    localStorage.removeItem("code")
}