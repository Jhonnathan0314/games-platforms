document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

/**FUNCIONES DE ACUERDO AL NIVEL */
//Método del Nivel Fácil
function LevelEasy(){

    window.open("./html/LevelEasy.html","_self")
}
//Método del Nivel Medio
function MediumLevel(){

    window.open("./html/MediumLevel.html","_self")

}
//Método del Nivel Dificil
function DifficultLevel(){

    window.open("./html/DifficultLevel.html","_self")

}

