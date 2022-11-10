verifyConfigurations()

function verifyConfigurations(){
    let vibrateButton = document.getElementById("vibrateButton");
    let musicButton = document.getElementById("musicButton");
    let efectsButton = document.getElementById("efectsButton");
    if(localStorage.getItem("vibrate") == "true"){
        vibrateButton.value = "VIBRAR: SI";
    }else{ 
        vibrateButton.value = "VIBRAR: NO";
    }
    if(localStorage.getItem("music") == "true"){
        musicButton.value = "SONIDO: SI";
    }else{ 
        musicButton.value = "SONIDO: NO";
    }
    if(localStorage.getItem("efects") == "true"){
        efectsButton.value = "EFECTOS: SI";  
    }else{
        efectsButton.value = "EFECTOS: NO";  
    }
}

function changeVibrate(){
    let vibrateButton = document.getElementById("vibrateButton");
    if(localStorage.getItem("vibrate") == "true"){
        localStorage.setItem("vibrate", "false");
        vibrateButton.value = "VIBRAR: NO"
    }else{
        localStorage.setItem("vibrate", "true");
        vibrateButton.value = "VIBRAR: SI"
        navigator.vibrate(200);
    }
}

function changeMusic(){
    let musicButton = document.getElementById("musicButton");
    if(localStorage.getItem("music") == "true"){
        localStorage.setItem("music", "false");
        musicButton.value = "SONIDO: NO";
    }else{
        localStorage.setItem("music", "true");
        musicButton.value = "SONIDO: SI";
    }
}

function changeEfects(){
    let efectsButton = document.getElementById("efectsButton");
    if(localStorage.getItem("efects") == "true"){
        localStorage.setItem("efects", "false");
        efectsButton.value = "EFECTOS: NO";
    }else{
        localStorage.setItem("efects", "true");
        efectsButton.value = "EFECTOS: SI";
    }
}

function resetSettings(){
    let vibrateButton = document.getElementById("vibrateButton");
    let musicButton = document.getElementById("musicButton");
    let efectsButton = document.getElementById("efectsButton");
    localStorage.setItem("vibrate", "true");
    localStorage.setItem("music", "true");
    localStorage.setItem("efects", "true");
    vibrateButton.value = "VIBRAR: SI";
    musicButton.value = "SONIDO: SI";
    efectsButton.value = "EFECTOS: SI";
}