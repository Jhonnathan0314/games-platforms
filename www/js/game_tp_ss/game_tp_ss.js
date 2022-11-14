var score = 0;
var score_html = document.getElementById('score')


window.addEventListener("devicemotion", function(event){
  accelerometer = (event.acceleration.z).toFixed(10)
  document.getElementById("Accelerometer_gz").innerHTML = event.acceleration.z.toFixed(10);
  if(accelerometer >= 20){
    score = score + 50;
    score_html.textContent = score
  }
}, true);
