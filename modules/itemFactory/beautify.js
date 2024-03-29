function beautify(userInput, profit, materialTree, materialList, procList) {

    // Beautify profit
    Object.entries(profit).forEach(element => {
        if (element[0] !== 'itemValue' && element[0] !== 'utensilCount' && element[0] !== 'bypCount') {
            profit[element[0]] = prep(profit[element[0]]);
        } else if (element[0] === 'utensilCount') {
            profit[element[0]] = prep(profit[element[0]], 1);
        } else if (element[0] === 'bypCount') {
            profit[element[0]] = prep(profit[element[0]], 2);
        }
    });

    // Beautify material list
    Object.entries(materialList).forEach(element => {
        materialList[element[0]].batchCost = prep(materialList[element[0]].batchCost, 0);
        materialList[element[0]].count = prep(materialList[element[0]].count, 0);
    });

    // Beautify proc list
    Object.entries(procList).forEach(element => {
        procList[element[0]].batchCost = prep(procList[element[0]].batchCost, 0);
        if (procList[element[0]].count % 1 != 0) {
            procList[element[0]].count = prep(procList[element[0]].count, 2);
        } else {
            procList[element[0]].count = prep(procList[element[0]].count, 0);
        }

    });

    // Beautify material tree
    Object.entries(materialTree).forEach(element => {
        materialTree[element[0]].imageName = prepImage(materialTree[element[0]].name);
        materialTree[element[0]].totalCount = prep(materialTree[element[0]].totalCount, 0);
    });

    // Prep final crafts
    userInput.craftsMastery = Number(userInput.craftsMastery);
    if (userInput.craftsMastery % 1 != 0) {
        userInput.craftsMastery = prep(userInput.craftsMastery, 2);
    } else {
        userInput.craftsMastery = prep(userInput.craftsMastery, 0);
    }
}

function prep(val, digits) {
    if (typeof val === 'undefined'){
        return;
    } else {
        return addCommas(truncate(val, digits));
    }
}

// Truncate decimal places
function truncate(val, digits) {
    return val.toFixed(digits);
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
};