document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    alert('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

var escenas;
var player;

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
            'onReady': selectEscene

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

function selectEscene(event){
    escenas.forEach((escena, i) => {
        setTimeout(() => {
            var audioPlayer = document.getElementById('audioPlayer')
            document.getElementById("player").style.display = 'none'
            document.getElementById('player').videoId = escena['direccion']
            audioPlayer.src='https://www.cuentapremium.com/pistasPlataformas/'+escena['id']+'.mp3'
            audioPlayer.style.display = 'block'
            event.target.loadVideoById(escena['direccion'])
            event.target.stopVideo()
            mixAnswers(escena)
        }, i * 10000)
        }
    )
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
            number = parseInt(Math.random() * 4);
        }
        options.push(number)
    }
    options.forEach((el, i) => {
        document.getElementById('a'+el).value=this.escenas[selected[i]]['nombre']
        if(i == 3){
            document.getElementById('a'+el).value=escena['nombre']
        }
    })
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
