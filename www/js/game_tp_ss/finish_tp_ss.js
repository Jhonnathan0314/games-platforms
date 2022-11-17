var score = 0;
//Varibles de los puntajes acumulados
var score1 = localStorage.getItem("score1")
var score2 = localStorage.getItem("score2")
var score3 = localStorage.getItem("score3")
//Obtener los datos del jugador y el número de juego asignado
var player = localStorage.getItem("idPlayer")
var game = 8
var flag = false
var playersGame = []

//Obtener jugadores de este juego
getPlayers()
function getPlayers(){
    fetch("https://games-plat-db.herokuapp.com/playerhasgame")
    .then(res=>res.json())
    .then(res=>validateRanking(res))
    .catch(error=> console.log(error))
}
//Validar sí ya hay jugadores que hayan terminado
function validateRanking(players){
    players.sort(function (a, b) {
        if (a.totalScore < b.totalScore) {
          return 1;
        }
        if (a.totalScore > b.totalScore) {
          return -1;
        }
        return 0;
    });
    for(player of players){
        if(player.game.idGame==8){
            flag = true
            playersGame.push(player)
        }
    }

    console.log(playersGame.length)
    //Primer puesto
    if(playersGame.length == 0){
        document.getElementById("score").innerHTML = "1°"
        score = 200;
        document.getElementById("score_add").innerHTML = "1ER PUESTO  .................. +" + score
    }
    //Segundo puesto
    if(playersGame.length == 1){
        document.getElementById("score").innerHTML = "2°"
        score = 100;
        document.getElementById("score_add").innerHTML = "2NDO PUESTO  .................. +" + score
    }
    //Tercer puesto
    if(playersGame.length == 2){
        document.getElementById("score").innerHTML = "3°"
        score = 50;
        document.getElementById("score_add").innerHTML = "3ER PUESTO  .................. +" + score
    }
    //Obtener el puntaje total
    score = score + parseInt(score1) + parseInt(score2) + parseInt(score3)
    viewScores(flag)
}
//Visualización de resultados
function viewScores(flag){
    document.getElementById("score1").innerHTML = "NIVEL 1 .................. " + score1
    document.getElementById("score2").innerHTML = "NIVEL 2 .................. " + score2
    document.getElementById("score3").innerHTML = "NIVEL 3 .................. " + score3
    document.getElementById("scoreTotal").innerHTML = "PUNTAJE TOTAL ....... " + score
    //Insertar el jugador que finalizo
    createScore(flag)
}
 //Insertar el jugador que finalizo
function createScore(flag){
    const idPlayer = localStorage.getItem("idPlayer")
    fetch("https://games-plat-db.herokuapp.com/playerhasgame/player/" + idPlayer + "/game/8",{
        method:"post",
        body:JSON.stringify({
            "score": score
        }),
        headers:{"Content-type":"application/json"}
    }).then(res => 
        console.log(res))
    .catch(error => 
        console.log(error))

    if(!flag){
        setTimeout(() => {
            getPlayers()
        }, 500);
    }else{
        updateSesionCoordinator()
        setTimeout(() => {
            if(localStorage.getItem("role") == "player"){
                window.open("../../html/coordinador_jf_wr/lobbie.html","_self")
            }else{
                window.open("../../html/coordinador_jf_wr/games.html","_self")
            }
        }, 5000);
    }
}
//Validar el sonido
var sound = -1
function checkSound(){
    //Sí hay sonido
    if(sound==1){
        document.getElementById("imgSound").setAttribute("src", "../../img/game_tp_ss/audio.png")
        document.getElementById("audio").play();
        sound = -1
    //No hay sonido
    }else{
        document.getElementById("imgSound").setAttribute("src", "../../img/game_tp_ss/noAudio.png")
        document.getElementById("audio").pause();
        sound = 1
    }
}

function updateSesionCoordinator() {
    fetch('https://games-plat-db.herokuapp.com/sesion/' + localStorage.getItem("codeSesionPlayer"),{
        method: "PUT",
        body: JSON.stringify({ 
            "coordinator": "default"
         }),
        headers: {"Content-type": "application/json"}
    }).then(res => console.log("updateSesionCoordinator"))
}