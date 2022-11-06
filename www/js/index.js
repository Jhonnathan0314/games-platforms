document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function goPlay() {
    window.open("./html/coordinador_jf_wr/create_or_join.html", "_self")
}

function goConfigurations() {
    window.open("./html/coordinador_jf_wr/configurations.html", "_self")
}

function goCredits() {
    window.open("./html/coordinador_jf_wr/credits.html", "_self")
}