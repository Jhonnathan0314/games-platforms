function goPlay() {
    window.open("./html/coordinador_jf_wr/create_or_join.html", "_self")
}

function goCredits() {
    window.open("./html/coordinador_jf_wr/credits.html", "_self")
}

function goHome() {
    window.open("../../index.html", "_self");
}

function goConfiguration(){
    window.open("./html/coordinador_jf_wr/configurations.html", "_self")
}

function goConfigurations(){
    window.open("../../html/coordinador_jf_wr/configurations.html", "_self")
}

function vibrate(){
    if(localStorage.getItem("vibrate") == "true"){
        navigator.vibrate(100);
    }
}