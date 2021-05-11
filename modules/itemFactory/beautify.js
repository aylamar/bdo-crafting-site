function beautify(profit, materialTree, materialList, procList) {

    Object.entries(profit).forEach(element => {
        if (element[0] !== 'itemValue') {
            profit[element[0]] = prep(profit[element[0]]);
        } else {}
    })
    Object.entries(materialList).forEach(element => {
        materialList[element[0]].batchCost = prep(materialList[element[0]].batchCost);
    })
    Object.entries(procList).forEach(element => {
        procList[element[0]].batchCost = prep(procList[element[0]].batchCost);
    })
    Object.entries(materialTree).forEach(element => {
        materialTree[element[0]].imageName = prepImage(materialTree[element[0]].name);
        materialTree[element[0]].totalCount = prep(materialTree[element[0]].totalCount);
    })
}

function prep(val) {
    return addCommas(truncate(val));
}

// Truncate decimal places
function truncate(val) {
    return val.toFixed();
}

// Return number as string with commas as needed
function addCommas(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Return input string in all lowercase with dashes instead of spaces 
function prepImage(val) {
    return val.replace(/ /g, "-").toLowerCase();
}

function round(toRound, roundMulti) {
    return Math.ceil(toRound / roundMulti) * roundMulti;
}

module.exports = {
    beautify,
}