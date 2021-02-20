var crateValue = 32550;

function updateBargain() {
    document.getElementById("bargainBonus").innerHTML = document.getElementById("bargain").value*100 + "%";
}

function updateDistance() {
    document.getElementById("distanceBonus").innerHTML = document.getElementById("distance").value + "%";
    document.getElementById("distanceValue").innerHTML = numberWithCommas(truncate((parseFloat(document.getElementById("distance").value)/100) * crateValue));
}

function updateDesert() {
    var checkbox = document.getElementById("desertStatus");
    
    if (checkbox.checked == true){
        document.getElementById("desertBonus").innerHTML = "50%";
    } else {
        document.getElementById("desertBonus").innerHTML = "";
    }
}

function truncate(i) {
    return i.toFixed(0);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}