localStorage.setItem("location", "create")

let inputCode = document.getElementById("inputCode")
inputCode.value = localStorage.getItem("code")

window.addEventListener('DOMContentLoaded', function(ev) { 
    findAllPlayers()
    setInterval(() => {
        findAllPlayers()
    }, 3000)
});

function findAllPlayers(){
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