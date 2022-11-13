window.onload = updateClock;

var totalTime = 8;
localStorage.setItem("answered","false")

window.addEventListener("deviceorientation",function(event) {
    alpha = Math.round(event.alpha);
    beta = Math.round(event.beta);
    gamma = Math.round(event.gamma);
    if(this.localStorage.getItem("answered")=="false"){
        if(beta>=30 && beta <=60){
            if(gamma>=65 && gamma<=90){
                if(this.document.getElementById("answerB").innerHTML==this.localStorage.getItem("correct")){
                    this.document.getElementById("containerB").setAttribute("class","container_optionsDos good")
                    addScore()
                }else{
                    this.document.getElementById("containerB").setAttribute("class","container_optionsDos bad") 
                }
                this.localStorage.setItem("answered", "true");
            }

            if(gamma<=-65 && gamma>=-90){
                if(this.document.getElementById("answerA").innerHTML==this.localStorage.getItem("correct")){
                    this.document.getElementById("containerA").setAttribute("class","container_optionsDos good")
                    addScore()
                }else{
                    this.document.getElementById("containerA").setAttribute("class","container_optionsDos bad") 
                }
                this.localStorage.setItem("answered", "true");
            }
        }
    }
  }, true);
  

function updateClock() {
  document.getElementById('time').innerHTML = totalTime;
  if(totalTime==0){
    let newnumQuestions=parseInt(localStorage.getItem("numQuestions"))-1;
    localStorage.setItem("numQuestions",newnumQuestions)
    location.reload()
  }else{
    totalTime-=1;
    setTimeout("updateClock()",1000);
  }
}

const historyQuestions={
    "1": "¿Quién recibió en 2009 en premionovel de paz?",
    "2": "¿Donde surgio la filosofia?",
    "3":"¿Que motivó la rebelión que dio lugar a la guerra de la independencia de EEUU??",
    "4": "¿María Antonieta fue reina de que país?",
    "5":"¿En que viaje colon encontró a los mayas?",
    "6":"¿En que año viajó el primer hombre a la luna?",
    "7":"¿En qué idioma se escribió el antiguo testamento por primera vez?",
    "8":"¿Cual de estos emperadores fua alumno del filósofo griego Aristóteles?",
    "9":"¿Donde se inventó la pólvora?",
    "10":"¿Cual idioma hablan los aztecas?"
}
const historyAnswers={
    "1": {
        "a":"Barack obama",
        "b":"Bill Clinton"
    },
    "2": {
        "a":"Grecia",
        "b":"España"
    },
    "3": {
        "a":"Esclavitud",
        "b":"Impuesto"
    },
    "4": {
        "a":"Reino unido",
        "b":"francia"
    },
    "5": {
        "a":"Tercero",
        "b":"Cuarto"
    },
    "6": {
        "a":"1969",
        "b":"1968"
    },
    "7": {
        "a":"Griego",
        "b":"Hebreo"
    },
    "8": {
        "a":"Carlomagno",
        "b":"Alejandro magno"
    },
    "9": {
        "a":"China",
        "b":"Francia"
    },
    "10": {
        "a":"Quechua",
        "b":"Náhuatl"
    }
}
const historyCorrects={
    "1": "Barack obama",
    "2": "Grecia",
    "3":"Impuesto",
    "4": "francia",
    "5":"Cuarto",
    "6":"1969",
    "7":"Hebreo",
    "8":"Alejandro magno",
    "9":"China",
    "10":"Náhuatl"
}
const scienceQuestions={
    "1":"¿En qué lado del cuerpo está el hígado?",
    "2":"¿Que numero viene después del 14 en los decimales del pi?",
    "3":"¿Cuantos elementos tiene la tabla periódica?",
    "4":"¿De los cinco sentidos, cual es el que se desarrolla primero?",
    "5":"A partir de que planta se elabora el tequila ",
    "6":"Pionera en el campo de la reactividad",
    "7":"¿En qué lugar del cuerpo se produce la insulina?",
    "8":"¿Cual es el material más duro del planeta?",
    "9":"¿Cual es la fuente de energía mas utilizada en la actualidad?",
    "10":"¿Qué metal es liquido a temperatura ambiente?"
}
const scienceAnswers={
    "1": {
        "a":"Derecho",
        "b":"Izquierdo"
    },
    "2": {
        "a":"1",
        "b":"2"
    },
    "3": {
        "a":"114",
        "b":"118"
    },
    "4": {
        "a":"Olfato",
        "b":"Oido"
    },
    "5": {
        "a":"Enebro",
        "b":"Agave"
    },
    "6": {
        "a":"María Teresa Ruíz",
        "b":"Marie Curie"
    },
    "7": {
        "a":"Páncreas",
        "b":"Hígado"
    },
    "8": {
        "a":"Mármol",
        "b":"Diamante"
    },
    "9": {
        "a":"Carbón",
        "b":"Petróleo"
    },
    "10": {
        "a":"Wolframio",
        "b":"mercurio"
    }
}
const scienceCorrects={
    "1": "Derecho",
    "2": "1",
    "3":"118",
    "4": "Olfato",
    "5":"Agave",
    "6":"Marie Curie",
    "7":"Páncreas",
    "8":"Diamante",
    "9":"Petróleo",
    "10":"mercurio"
}
const technologyQuestions={
    "1":"¿Cual es la ciencia que estudia la aplicación de la informática y las comunicaciones del hogar?",
    "2":"¿Como se llama el sistema operativo con el que trabajan los teléfonos HTC, LG Samsung?",
    "3":"¿Qué marca creo en 2007 el primer iphone?",
    "4":"¿•	Quien inventó Google?",
    "5":"¿Cuál es la página de internet más visitada del mundo?",
    "6":"¿Cuando se fundó Nintendo?",
    "7":"¿Qué marca vende más teléfonos en el mundo?",
    "8":"¿Qué lenguaje informático es el más utilizado?",
    "9":"¿Quien invento Facebook?",
    "10":"¿En qué año se creó la primera computadora?"
}
const technologyAnswers={
    "1": {
        "a":"Robótica",
        "b":"Domótica"
    },
    "2": {
        "a":"Ios",
        "b":"Android"
    },
    "3": {
        "a":"Apple",
        "b":"Android"
    },
    "4": {
        "a":"Bill gates",
        "b":"Larry page"
    },
    "5": {
        "a":"Facebook",
        "b":"Google"
    },
    "6": {
        "a":"1889",
        "b":"1995"
    },
    "7": {
        "a":"Samsung",
        "b":"Apple"
    },
    "8": {
        "a":"Java",
        "b":"Sql"
    },
    "9": {
        "a":"Mark Elliot Zuckerberg",
        "b":"Bill gates"
    },
    "10": {
        "a":"1822",
        "b":"1830"
    }
}
const technologyCorrects={
    "1": "Domótica",
    "2": "Android",
    "3":"Apple",
    "4": "Larry page",
    "5":"Google",
    "6":"1889",
    "7":"Samsung",
    "8":"Java",
    "9":"Mark Elliot Zuckerberg",
    "10":"1822"
}

updateScore()
function updateScore(){
    fetch("https://games-plat-db.herokuapp.com/player/" + localStorage.getItem("idPlayer"))
    .then(res=>res.json())
    .then(res=>refreshScoreInScreen(res))
    .catch(error=> console.log(error))
    
}
selectQuestion();
function selectQuestion(){
    let numQuestions=parseInt(localStorage.getItem("numQuestions"));
    if(numQuestions>0){
        let random=Math.floor(Math.random() * (10 - 1) + 1)+"";
        if(localStorage.getItem("catQuestions")=="history"){
            document.getElementById("question").textContent=historyQuestions[random];
            document.getElementById("answerA").textContent=historyAnswers[random]["a"];
            document.getElementById("answerB").textContent=historyAnswers[random]["b"];
            localStorage.setItem("correct",historyCorrects[random]);
        }else if(localStorage.getItem("catQuestions")=="science"){
            document.getElementById("question").textContent=scienceQuestions[random];
            document.getElementById("answerA").textContent=scienceAnswers[random]["a"];
            document.getElementById("answerB").textContent=scienceAnswers[random]["b"];
            localStorage.setItem("correct",scienceCorrects[random]);

        }else if(localStorage.getItem("catQuestions")=="technology"){
            document.getElementById("question").textContent=technologyQuestions[random];
            document.getElementById("answerA").textContent=technologyAnswers[random]["a"];
            document.getElementById("answerB").textContent=technologyAnswers[random]["b"];
            localStorage.setItem("correct",technologyCorrects[random]);
        }
    }else{
        localStorage.setItem("numQuestions","5");
        if(localStorage.getItem("catQuestions")=="history"){
            localStorage.setItem("catQuestions","science");
            window.open("../../html/game_pb_mm/scienceSection.html", "_self");
        }else if(localStorage.getItem("catQuestions")=="science"){
            localStorage.setItem("catQuestions","technology")
            window.open("../../html/game_pb_mm/technologySection.html", "_self");
        }else{
            localStorage.removeItem("catQuestions");
            localStorage.removeItem("numQuestions");
            updateSesionCoordinator()
            if(localStorage.getItem("role") == "player"){
                window.open("../../html/coordinador_jf_wr/lobbie.html","_self")
            }else{
                window.open("../../html/coordinador_jf_wr/games.html","_self")
            }
        }
    }
}
function refreshScoreInScreen(res){
     console.log(res)
    document.getElementById("score").textContent=res.totalScore
}

function addScore(){
    const idPlayer = localStorage.getItem("idPlayer")
    fetch("https://games-plat-db.herokuapp.com/playerhasgame/player/" + idPlayer + "/game/6",{
        method:"post",
        body:JSON.stringify({
            "score": 134
        }),
        headers:{"Content-type":"application/json"}
    }).then(res =>console.log(res)).catch(error =>console.log(error))
}


function goQuestions(){
    window.open("./questionsSection.html","_self");
}

function goHome(){
    window.open("../../html/game_pb_mm/homepb.html", "_self");
}

function updateSesionCoordinator() {
    fetch('https://games-plat-db.herokuapp.com/sesion/' + localStorage.getItem("code"),{
        method: "PUT",
        body: JSON.stringify({ 
            "coordinator": "default"
         }),
        headers: {"Content-type": "application/json"}
    }).then(res => 
        setTimeout(() => {
            localStorage.setItem("role", "admin")
            window.open("../../html/game_pb_mm/homepb.html", "_self")
        }, 300))
}