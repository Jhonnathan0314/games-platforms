var score = 0;
//Varibles de los puntajes acumulados
var score1 = localStorage.getItem("score1")
var score2 = localStorage.getItem("score2")
var score3 = localStorage.getItem("score3")
//Obtener los datos del jugador y el número de juego asignado
var player = localStorage.getItem("idPlayer")
var game = localStorage.getItem("idGame")

//Obtener jugadores de este juego
function getPlayers(){
    fetch("https://games-plat-db.herokuapp.com/playerhasgame/game/"+game)
    .then(res=>res.json())
    .then(res=>validateRanking(res))
    .catch(error=> console.log(error))
}
//Validar sí ya hay jugadores que hayan terminado
function validateRancking(players){
    //Primer puesto
    if(players.lenght == 0){
        document.getElementById("score").innerHTML = "1°"
        score = 200;
        document.getElementById("score_add").innerHTML = "1ER PUESTO  .................. +" + score
    }
    //Segundo puesto
    if(players.lenght == 1){
        document.getElementById("score").innerHTML = "2°"
        score = 100;
        document.getElementById("score_add").innerHTML = "2NDO PUESTO  .................. +" + score
    }
    //Tercer puesto
    if(players.lenght == 2){
        document.getElementById("score").innerHTML = "3°"
        score = 50;
        document.getElementById("score_add").innerHTML = "3ER PUESTO  .................. +" + score
    }
    //Obtener el puntaje total
    score = score + parseInt(score1) + parseInt(score2) + parseInt(score3)
}
//Visualización de resultados
viewScores()
function viewScores(){
    document.getElementById("score1").innerHTML = "NIVEL 1 .................. " + score1
    document.getElementById("score2").innerHTML = "NIVEL 2 .................. " + score2
    document.getElementById("score3").innerHTML = "NIVEL 3 .................. " + score3
    document.getElementById("scoreTotal").innerHTML = "PUNTAJE TOTAL ....... " + score
    //Insertar el jugador que finalizo
    createScore()
}
 //Insertar el jugador que finalizo
function createScore(){
    fetch("https://games-plat-db.herokuapp.com/playerhasgame/player/" + player + "/game/" + game,{
        method:"post",
        body:JSON.stringify({
            "score": score
        }),
        headers:{"Content-type":"application/json"}
    }).then(res =>console.log(res)).catch(error =>console.log(error))
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