function goHistorySection(){ 
    window.open("../../html/game_pb_mm/historySection.html", "_self");
}
function goScienceSection(){
    window.open("./scienceSection.html","_self");
}
function goTechnologySection(){
    window.open("./technologySection.html","_self");
}
localStorage.setItem("catQuestions","history")

function goHome(){
    window.open("../../index.html", "_self");
}

function deletePlayer() {
    let idPlayer = localStorage.getItem("idPlayer")
    fetch('https://games-plat-db.herokuapp.com/player/' + idPlayer,{
        method: "DELETE",
        body: JSON.stringify({ }),
        headers: {"Content-type": "application/json"}
    }).then(res => 
        setTimeout(() => {
            window.open("../../index.html", "_self")
        }, 150),
        localStorage.removeItem("codeSesionPlayer"),
        localStorage.removeItem("idPlayer"))
}