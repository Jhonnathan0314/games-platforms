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
    .then(res => createSesionHasGames(res))
}

function createSesionHasGames(allGames){
    let idSesion = localStorage.getItem("code")

    for(game of allGames){
        console.log(game)
        console.log('https://games-plat-db.herokuapp.com/sesionhasgame/sesion/' + idSesion + '/game/' + game.idGame)
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