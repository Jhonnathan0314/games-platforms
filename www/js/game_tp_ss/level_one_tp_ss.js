window.onload = countTime;
//Declaración de variables
var score = 0;
var score_html = document.getElementById('score')
var time = 16;

function countTime() {
  if (time == 10) {
    //Detectar el movimiento del dispositivo
    window.addEventListener("devicemotion", function (event) {
      //Metodo - aparecer imagen explicativa
      document.getElementById('img').setAttribute("hidden", "hidden")
      //Obtener la aceleración en el X 
      accelerometer = (event.acceleration.x).toFixed(10)
      if (accelerometer >= 65) {
        score = score + 4;
        score_html.textContent = "PUNTAJE:0" + score
      }
      if (score == 400) {
        sessionStorage.setItem("score", 400)
        this.window.open("../../html/game_tp_ss/level_two_tp_ss.html", "_self");
      }
    }, true);
  } else {
    time -= 1;
    setTimeout("countTime()", 1000);
  }
}




