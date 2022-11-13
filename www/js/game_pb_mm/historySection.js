window.addEventListener('DOMContentLoaded', function(ev) { 
    setTimeout(() => {
        window.open("../../html/game_pb_mm/questionsSection.html", "_self");
    }, 4000)
})
localStorage.setItem("numQuestions","5")


function goHome(){
    window.open("../../html/game_pb_mm/homepb.html", "_self");
}