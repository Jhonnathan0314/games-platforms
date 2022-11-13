localStorage.setItem("location", "lobbie")

window.addEventListener('DOMContentLoaded', function(ev) { 
    findAllPlayers()
    setInterval(() => {
        findAllPlayers()
    }, 5000)
});

function refreshPlayers(){
    findAllPlayers()
}

function findAllPlayers(){
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

function deletePlayer() {
    let idPlayer = localStorage.getItem("idPlayer")
    fetch('https://games-plat-db.herokuapp.com/player/' + idPlayer,{
        method: "DELETE",
        body: JSON.stringify({ }),
        headers: {"Content-type": "application/json"}
    }).then(res => 
        setTimeout(() => {
            window.open("../../index.html", "_self")
        }, 150),
        localStorage.removeItem("codeSesionPlayer"),
        localStorage.removeItem("idPlayer"))
}