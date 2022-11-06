function saveName() {
    let name = document.getElementById("username").value;
    if(name != ""){
        console.log(name)
        cleanScreen();
    }
}

function cleanScreen() {
    let containerTitle = document.querySelector(".container_title");
    let inputName = document.getElementById("username");
    let saveButton = document.getElementById("save");

    containerTitle.setAttribute("hidden", "true");
    inputName.setAttribute("hidden", "true");
    saveButton.setAttribute("hidden", "true");
}