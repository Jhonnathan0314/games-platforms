function goLobbie() {
    let sesionCode = document.getElementById("inputCode").value

    fetch('https://games-plat-db.herokuapp.com/sesion/'+sesionCode)
    .then(res => res.json())
    .then(res => validateSesion(res, sesionCode))
    .catch(err => console.log(err))
}

function validateSesion(sesion, sesionCode) {
    if(sesion.id_sesion != undefined){
        createPlayer(sesionCode)
    }else{
        document.getElementById("inputCode").value = ""
    }
}

function createPlayer(sesionCode) {
    fetch('https://games-plat-db.herokuapp.com/player/sesion/' + sesionCode,{
        method: "POST",
        body: JSON.stringify({
            "username": "Esperando...",
            "totalScore": 0
        }),
        headers: {"Content-type": "application/json"}
    }).then(res => res.json())
    .then(res => 
        localStorage.setItem("idPlayer", res.idPlayer),
        localStorage.setItem("codeSesionPlayer", sesionCode)
    )
    .catch(error => console.log(error))
    setTimeout(() => {
        window.open("../../html/coordinador_jf_wr/lobbie.html", "_self")
    }, 300);
}