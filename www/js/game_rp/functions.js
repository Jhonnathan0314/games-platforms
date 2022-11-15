document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    alert('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

var escenas;
var player;
var startTime;
var finalScore = 0;
var rightAnswer;
var ok = document.getElementById("modalOk");
var oknt = document.getElementById("modalOkn't");
var final = document.getElementById('final');
var scoreModal = document.getElementById('finalScore');
var timer;
var indiceEscena = 0;
var evento;

let nick = document.getElementById("username");

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

loadEscenes()
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '200',
        width: '250',
        events: {
            'onReady': onYtReady
        }
    });
}

function loadEscenes(){
    fetch('/www/js/game_rp/escenas.json').then(
        response => {
            return response.json();
        }
    ).then( data =>{
        escenas = data
    })
}

function onYtReady(event){
    evento = event
    selectEscene()
}

function selectEscene(){
    var cuenta = escenas.length;
    if (indiceEscena > 13){
        clearInterval(timer);
        document.getElementById('final').style.display ="block";
        document.getElementById('fscore').innerText = finalScore;
    } else {
        iniciarEscena();
        timer = setInterval(() => {
            if (indiceEscena > 13){
                clearInterval(timer);
                document.getElementById('final').style.display ="block";
                document.getElementById('fscore').innerText = finalScore;
            } else if (cuenta > indiceEscena) {
                iniciarEscena();
            }
        }, 60000);
    }


}

function iniciarEscena() {
    clearAnswers();
    closeModals();
    document.getElementById('escene').innerText ='Escena ' + escenas[indiceEscena]['id']
    var audioPlayer = document.getElementById('audioPlayer');
    document.getElementById("player").style.display = 'none';
    document.getElementById('player').videoId = escenas[indiceEscena]['direccion'];
    audioPlayer.src='https://www.cuentapremium.com/pistasPlataformas/'+escenas[indiceEscena]['id']+'.mp3';
    audioPlayer.style.display = 'block';
    evento.target.loadVideoById(escenas[indiceEscena]['direccion']);
    evento.target.stopVideo();
    mixAnswers(escenas[indiceEscena]);
    startTime = new Date().getTime();
    indiceEscena++;
}

function mixAnswers(escena) {
    let selected = []
    let options = []
    let number = 0
    for(let i = 0; i < 4; i++){
        number = parseInt(Math.random() * (1 - 14) + 14);
        while (number == escena['id'] || selected.includes(number) || this.escenas[number]['nombre'] == escena['nombre'] || number == 0) {
            number = parseInt(Math.random() * (1 - 14) + 14);
        }
        selected.push(number);
        number = parseInt(Math.random() * 4);
        while (options.includes(number)){
            number = parseInt(Math.random() * 4);;
        }
        options.push(number)
    }
    options.forEach((el, i) => {
        document.getElementById('a'+el).value=this.escenas[selected[i]]['nombre'];
        document.getElementById('a'+el).disabled=false;
        if(i == 3){
            rightAnswer = el;
            document.getElementById('a'+el).value=escena['nombre'];
            document.getElementById('a'+el).disabled=false;
        }
    })
}

function calculoPuntaje() {
    let choosenTime = new Date().getTime();
    let finalTime = (choosenTime/1000)-(startTime/1000);
    if (finalTime < 20){
        finalScore = finalScore + 142;
    } else if (finalTime > 20 && finalTime < 40){
        finalScore = finalScore + 94.6
    } else if (finalTime > 40){
        finalScore = finalScore + 47.3
    }
}

function clearAnswers() {
    for(let i = 0; i < 4; i++){
        document.getElementById('a'+i).value="";
        document.getElementById('a'+i).disabled = true;
    }
}

function choose(event){
    hide_show_YT();
    for(let i = 0; i < 4; i++){
        document.getElementById('a'+i).disabled = true;
    }
    if (event == rightAnswer) {
        ok.style.display = "block";
        calculoPuntaje()
    } else {
        oknt.style.display = "block";
    }
    document.getElementById('score').innerText ='Puntaje: ' + finalScore
}

function closeModals(){
    ok.style.display = "none";
    oknt.style.display = "none";
    final.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == ok || event.target == oknt || event.target == final)
        closeModals()
}

function hide_show_YT() {
    player = document.getElementById("player");
    document.getElementById('audioPlayer').style.display = 'none';
    if (player.style.display === "none") {
        player.style.display = "block";
    } else {
        audioPlayer.style.display = 'block'
        player.style.display = "none";
    }
}

function cambiarEscena(){
    clearInterval(timer)
    selectEscene()
}
