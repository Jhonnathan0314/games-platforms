var cronometer;
var score = 1000000;
s = document.getElementById("seconds");
m = document.getElementById("minutes");

solicitarNombre()
function solicitarNombre(){
  prompt("Digite su nombre : ")
}

function goScoreBoard(){

    window.open("../html/ScoreBoard.html","_self")

}

function goHome(){

    window.open("../index.html","_self")

}

/**Logica*/

var palabras = 
[
  
  ["Suspira", "Pelicula de Terror"], 
  ["Terciopelo", "Tipo de tela"], 
  ["Rumpelstiltskin", "Cuento infantil"], 
  ["Beagle", "Raza de perros"], 
  ["Thomas", "Nombre Masculino"], 
  ["Ask", "Buscador online"], 
  ["Ruby", "Lenguaje de Programación"], 
  ["Filtracion", "Etapa del ciclo del agua"], 
  ["Pinguino", "Animal Oviparo"], 
  ["Depresion", "Tipo de relieve terrestre"], 
  ["Ciclon", "Fenomemos Climaticos"],
  ["Micropunta", "Articulo de papeleria"], 
  ["Frambuesas", "Frutas Silvestres"], 
  ["Batidora", "Nombre de electrodomestico"], 
  ["Begonia", "Planta de jardin"], 
  ["jumping", "Deporte extremo"], 
 
  
];
// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 3;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");


// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  rand = (Math.random() * 19).toFixed(0);
  palabra = palabras[rand][0].toUpperCase();
  console.log(palabra);
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}

//Generar abecedario
function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    if(i==110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='"+letra+"'>Ñ</button>";
    }
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "  ¡  Correcto  !";
    document.getElementById("acierto").className += "acierto verde";
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "    :( Incorrecto  ";
    document.getElementById("acierto").className += "acierto rojo";
    document.getElementById("image"+cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").className = ""; 
  }, 800);
}

// Obtener pista
function pista() {
  document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}

// Compruba si ha finalizado

// Compruba si ha finalizado
function compruebaFin() {
  if (oculta.indexOf("_") == -1) {
    var snd = new Audio("../aud/gano.mp3");
    snd.play();
    score =parseInt(score / seconds);
    document.getElementById("msg-final").innerHTML = "Felicidades !! \n Score \n "+score;
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    navigator.vibrate([500, 200, 1000]);
    document.getElementById("reset").innerHTML = "Empezar";
    pause();
    btnInicio.onclick = function () { location.reload() };
  } else if (cont == 0) {
    var snd = new Audio("../aud/perdio.mp3");
    score=0;
    snd.play();
    navigator.vibrate([400, 200, 500]);
    navigator.vibrate([800, 500, 1000]);
    navigator.vibrate([1200, 900, 3000]);
    document.getElementById("msg-final").innerHTML = ":( Perdiste \n Score \n "+score ;
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    for (var i = 0; i < palabra.length; i++) {
      oculta[i] = palabra[i];
    }
    hueco.innerHTML = oculta.join("");
    pause();
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  }
}
function StartTime() {
  avance = 1000;
  seconds = 0;


  cronometer = setInterval(function () {
    seconds++;
    secs = seconds;
    mins = 0;
    while (secs >= 60) {
      mins++;
      secs -= 60;

    }
    if (mins < 10) m.innerHTML = "0" + mins;
    else m.innerHTML = mins;
    if (secs < 10) s.innerHTML = "0" + secs;
    else s.innerHTML = secs;

  }, avance);


}
function pause() {
  clearInterval(cronometer)
}
function borrar(num){
  for (var i = 0; i < num; i++) {
    oculta[i] = "";
  }
  hueco.innerHTML = oculta.join("");
}

// Restablecer juego
function inicio() {
  pause();
  StartTime();
  borrar(palabra.length)
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a", "z");
  cont = 8;
  document.getElementById("intentos").innerHTML = cont;

}

// Iniciar
window.onload = inicio();
