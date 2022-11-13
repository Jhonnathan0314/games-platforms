localStorage.setItem("location", "create_or_join")

function goCreate(){ 
    window.open("./create.html", "_self")
}

function goJoin(){ 
    window.open("./join.html", "_self")
}

function createSesion(){
    fetch('https://games-plat-db.herokuapp.com/sesion',{
        method: "POST",
        body: JSON.stringify({
            "coordinator": "default"
        }),
        headers: {"Content-type": "application/json"}
    }).then(res => res.json())
    .then(res => 
        setTimeout(() => {
            localStorage.setItem("code", res.id_sesion)
            findAllGames()
        }, 300))
    .catch(error => console.log(error))   
}

function findAllGames() {
    fetch("https://games-plat-db.herokuapp.com/game")
    .then(res => res.json())
    .then(res => createPlayer(res))
}

function createPlayer(games){
    fetch('https://games-plat-db.herokuapp.com/player/sesion/' + localStorage.getItem("code"),{
        method: "POST",
        body: JSON.stringify({
            "username": "Admin",
            "totalScore": 0
        }),
        headers: {"Content-type": "application/json"}
    }).then(res => res.json())
    .then(res => 
        localStorage.setItem("idPlayer", res.idPlayer),
        localStorage.setItem("codeSesionPlayer", localStorage.getItem("code"))
    )
    .catch(error => console.log(error))
    setTimeout(() => {
        createSesionHasGames(games)
    }, 300);
}

function createSesionHasGames(allGames){
    let idSesion = localStorage.getItem("code")

    for(game of allGames){
        fetch('https://games-plat-db.herokuapp.com/sesionhasgame/sesion/' + idSesion + '/game/' + game.idGame,{
            method: "POST",
            body: JSON.stringify({ }),
            headers: {"Content-type": "application/json"}
        }).then(res => res.json())
        .then(res => 
            setTimeout(() => {
                goCreate()
            }, 150))
        .catch(error => console.log(error))
    }
}