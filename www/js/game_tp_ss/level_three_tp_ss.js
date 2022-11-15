window.onload = countTime;
//Declaración de variables
var score = 0;
var score_html = document.getElementById('score')
var time = 26;
var time2 = 20;

function countTime() {
  if (time == 20) {
    //Detectar el movimiento del dispositivo
    countTime2()
    window.addEventListener("devicemotion", function (event) {
      //Metodo - aparecer imagen explicativa
      document.getElementById('information_level').setAttribute("hidden", "hidden")
      document.getElementById('img').setAttribute("hidden", "hidden")
      //Obtener la aceleración en el X
      accelerometer = (event.acceleration.z).toFixed(10)
      if (accelerometer >= 65) {
        score = score + 2;
        score_html.textContent = "PUNTAJE:0" + score
      }
      if (score == 400) {
        sessionStorage.setItem("score", 400)
        this.window.open("../../html/game_tp_ss/finish_tp_ss.html", "_self");
      }
    }, true);
  } else {
    time -= 1;
    setTimeout("countTime()", 1000);
  }
}

function countTime2() {
  if (time2 == 0) {
    this.window.open("../../html/game_tp_ss/finish_tp_ss.html", "_self");
  } else {
    time2 -= 1;
    setTimeout("countTime2()", 1000);
  }
}