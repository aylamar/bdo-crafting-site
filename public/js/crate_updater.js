function updateBargain() {
    document.getElementById("bargainBonus").innerHTML = document.getElementById("bargain").value*100 + "%";
}

function updateDistance() {
    document.getElementById("distanceBonus").innerHTML = document.getElementById("distance").value + "%";
}

function updateDesert() {
    var checkbox = document.getElementById("desertStatus");
    
    if (checkbox.checked == true){
        document.getElementById("desertBonus").innerHTML = "50%";
    } else {
        document.getElementById("desertBonus").innerHTML = "";
    }

    //document.getElementById("desertBonus").innerHTML = document.getElementById("desertStatus").value + "%";
}