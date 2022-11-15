const jugador=document.getElementById("jugador");
const obstaculo=document.getElementById("obstaculo");
let gameLoop;
let puntajeFinal=0;

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
    
    if(obstaculoLeft<0){
        obstaculo.style.display="none";
    }else{
        obstaculo.style.display='';
    }

    if(obstaculoLeft < 35 && obstaculoLeft >0 && jugadorTop>90){
        navigator.vibrate(1000);
        puntajeFinal=clearInterval(pararIntervalo);
        alert("Juego terminado");
        addScore()
        updateSesionCoordinator()
        console.log(puntaje);
        setTimeout(() => {
            if(localStorage.getItem("role") == "player"){
                window.open("../../html/coordinador_jf_wr/lobbie.html","_self")
            }else{
                window.open("../../html/coordinador_jf_wr/games.html","_self")
            }
        }, 300);
    }

},100);

let pararIntervalo=setInterval(()=>{
    puntaje++;
    document.getElementById("puntaje").innerText=puntaje;
},1000)

function addScore(){
    const idPlayer = localStorage.getItem("idPlayer")
    fetch("https://games-plat-db.herokuapp.com/playerhasgame/player/" + idPlayer + "/game/9",{
        method:"post",
        body:JSON.stringify({
            "score": puntaje
        }),
        headers:{"Content-type":"application/json"}
    }).then(res =>console.log(res)).catch(error =>console.log(error))
}

function updateSesionCoordinator() {
    fetch('https://games-plat-db.herokuapp.com/sesion/' + localStorage.getItem("codeSesionPlayer"),{
        method: "PUT",
        body: JSON.stringify({ 
            "coordinator": "default"
         }),
        headers: {"Content-type": "application/json"}
    }).then(res => console.log("updateSesionCoordinator"))
}