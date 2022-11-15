var score1 = localStorage.getItem("score1")
var score2 = localStorage.getItem("score2")
var score3 = localStorage.getItem("score3")

function viewScores(){
    document.getElementById("score1").innerHTML = "NIVEL 1 ........... " + score1
    document.getElementById("score2").innerHTML = "NIVEL 2 ........... " + score2
    document.getElementById("score3").innerHTML = "NIVEL 3 ........... " + score3
    document.getElementById("scoreTotal").innerHTML = "PUNTAJE TOTAL ........... " + (score3 + score2 + score1)
}

viewScores()
var sound = -1
function checkSound(){
    if(sound==1){
        document.getElementById("imgSound").setAttribute("src", "../../img/game_tp_ss/audio.png")
        document.getElementById("audio").removeAttribute("hidden")
        sound = -1
    }else{
        document.getElementById("imgSound").setAttribute("src", "../../img/game_tp_ss/noAudio.png")
        document.getElementById("audio").setAttribute("hidden", "hidden")
        sound = 1
    }
}