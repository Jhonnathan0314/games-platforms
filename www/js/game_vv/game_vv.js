const jugador=document.getElementById("jugador");
const obstaculo=document.getElementById("obstaculo");
let gameLoop;

document.addEventListener("click", function(){
    jugador.classList.add("saltarJugador")
})

jugador.addEventListener("animationend", ()=>{
    jugador.classList.remove("saltarJugador")
});

let puntaje=0;


let vivo=setInterval(function(){
    //obtener la posicion del jugador en y
    let jugadorTop=parseInt(window.getComputedStyle(jugador).getPropertyValue("top"));
    //obtener la posicion del obstaculo en x
    let obstaculoLeft=parseInt(window.getComputedStyle(obstaculo).getPropertyValue("left"));
    
    
    if(obstaculoLeft < 20 && obstaculoLeft >0 && jugadorTop>=230){
        navigator.vibrate(2000);
        alert("Juego terminado");
    }

},100);





setInterval(()=>{
    puntaje++;
    document.getElementById("puntaje").innerText=puntaje;
},1000)