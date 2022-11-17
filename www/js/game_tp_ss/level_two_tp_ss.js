window.onload = countTime;
//Declaración de variables
var score = 0;
var score_html = document.getElementById('score')
var time = 21;
var time2 = 15;

function countTime() {
  if (time == 15) {
    //Detectar el movimiento del dispositivo
    countTime2()
    window.addEventListener("devicemotion", function (event) {
      //Metodo - aparecer imagen explicativa
      document.getElementById('information_level').setAttribute("hidden", "hidden")
      document.getElementById('img').setAttribute("hidden", "hidden")
      //Obtener la aceleración en el X
      accelerometer = (event.acceleration.y).toFixed(10)
      if (accelerometer >= 25) {
        score = score + 4;
        score_html.textContent = "PUNTAJE:0" + score
      }
      if (score == 600) {
        window.navigator.vibrate([1000]);
        localStorage.setItem("score2", 600)
        this.window.open("../../html/game_tp_ss/level_three_tp_ss.html", "_self");
      }
    }, true);
  } else {
    time -= 1;
    setTimeout("countTime()", 1000);
  }
}

function countTime2() {
  if (time2 == 0) {
    window.navigator.vibrate([1000]);
    localStorage.setItem("score2", score)
    this.window.open("../../html/game_tp_ss/level_three_tp_ss.html", "_self");
  } else {
    time2 -= 1;
    setTimeout("countTime2()", 1000);
  }
}

var sound = -1
function checkSound() {
  if (sound == 1) {
    document.getElementById("imgSound").setAttribute("src", "../../img/game_tp_ss/audio.png")
    document.getElementById("audio").play();
    sound = -1
  } else {
    document.getElementById("imgSound").setAttribute("src", "../../img/game_tp_ss/noAudio.png")
    document.getElementById("audio").pause();
    sound = 1
  }
}