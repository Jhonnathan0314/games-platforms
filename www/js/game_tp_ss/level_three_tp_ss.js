var score = 0;
var score_html = document.getElementById('score')


window.addEventListener("devicemotion", function(event){
  accelerometer = (event.acceleration.z).toFixed(10)
  document.getElementById("Accelerometer_gz").innerHTML = event.acceleration.z.toFixed(10);
  if(accelerometer >= 65){
    score = score + 2;
    score_html.textContent = "PUNTAJE:0" + score
  }
}, true);

//Metodo - aparecer imagen explicativa
setTimeout(function () {
  $("#img").fadeOut(1800)
})