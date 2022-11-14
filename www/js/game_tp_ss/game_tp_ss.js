var photos = new Array()
var which = 0
var directoryImages = "/www/img/game_tp_ss/"
////cambia las variables necesarias
photos[0] = "img1.png"
photos[1] = "img2.png"
photos[2] = "img3.png"
photos[3] = "img4.png"
photos[4] = "img5.png"
photos[5] = "img6.png"
photos[6] = "img7.png"

var delay = 5000 //En milisegundos,1000=1segundo
var count = 1;

var cubeimage = new Array()
for (i = 0; i < photos.length; i++) {
  cubeimage[i] = new Image()
  cubeimage[i].src = directoryImages + photos[i]
}

function movecube() {
  if (window.createPopup)
    cube.filters[0].apply()
  document.images.cube.src = cubeimage[count].src;
  if (window.createPopup)
    cube.filters[0].play()
  count++;
  if (count == cubeimage.length)
    count = 0;
  setTimeout("movecube()", delay)
}

window.onload = new Function("setTimeout('movecube()',delay)")


//Varables para la conexión
const mysql = require('mysql');
const connection =  mysql.createConnection({
  host:"ec2-52-22-136-117.compute-1.amazonaws.com",
  database: "ddcv39k2aku9it",
  user:"xfqtlewebtgskt",
  port:5432,
  password:" 6860ded4dfe1176e5fac22e92b0aa971fb8f5b6c1537ba132542d092b1bcb706",
})

//Conexion con la BD
connection.connect((err)=>{
  if(err) throw err
  alert('La conexión funciona')
})

var score = 0;
var score_html = document.getElementById('score')


//Validación del juego
function motion(event) {
    //Verificar el movimiento
    if(event.accelerationIncludingGravity.z>4 || 
      event.accelerationIncludingGravity<-3){
      score = score + 50;
      score_html.innerHTML = ''+score;
    }
    if(score == 1800){
      connection.query('SELECT * FROM GAMES',(err,data)=>{
        if(err) throw err
        alert('Los datos de la tabla Juegos son estos')
        alert(data)
      }
    )
    }

}
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", motion);
} else {
  console.log("DeviceOrientationEvent is not supported");
}


connection.end()
