const priceDB = require('../priceDB');
const itemDB = require('../itemDB');

var addToMaterialList = function addToMaterialList(materialList, name, count, body) {

    ml = materialList.length;
    var found = false;
    var i = 0;
    if (typeof materialList[0] !== "undefined") {
        for (; i < ml; i++) {
            if (materialList[i].name === name) {
                found = true;
                break;
            }
        }
        if (found != true) {
            i = ml;
            materialList[i] = new Object();
            materialList[i].batchCost = 0;
            materialList[i].count = 0;
        }
    } else {
        materialList[i] = new Object();
        materialList[i].batchCost = 0;
        materialList[i].count = 0;
    }
    materialList[i].name = name;
    materialList[i].count += count;

    var key = `material-cost${i}`;
    if (body != null && body[key] !== 0) {
        materialList[i].cost = body[key];
    } else {
        if (materialList[i].name === 'Grain') {
            var avg = 0;
            avg += priceDB['Barley'].value;
            avg += priceDB['Corn'].value;
            avg += priceDB['Potato'].value;
            avg += priceDB['Sweet Potato'].value;
            avg += priceDB['Wheat'].value;
            avg = avg / 5;
            materialList[i].cost = avg;
        } else {
            materialList[i].cost = priceDB[materialList[i].name].value;
        }
    }
    if (typeof materialList[i].batchCost === "undefined") {
        materialList[i].batchCost = 0;
    }
    materialList[i].batchCost = Number(materialList[i].cost * materialList[i].count);
    return materialList;
}

var addToMaterialTree = function addToMaterialTree(materialTree, name, column, count, totalCount, multi) {
    var mt = materialTree.length;
    materialTree[mt] = {
        name,
        imageName: 'placeholder',
        column,
        count,
        totalCount: Math.ceil(Math.max(totalCount, count)),
        multiPart: multi
    };
    return materialTree;
}

var checkProc = function checkProc(thingToCheck, craftAmount, userInput, procList, body) {
    if (typeof itemDB[thingToCheck].proc !== "undefined") {
        addToProcList(procList, itemDB[thingToCheck].proc, (craftAmount * userInput.masteryProc), userInput, body);
    }
}

var addToProcList = function addToProcList(procList, name, count, userInput, body) {
    if (name === userInput.item) {
        userInput.craftsMastery += count;
    } else {
        pl = procList.length;
        procList[pl] = new Object();
        procList[pl].name = name;
        procList[pl].count = Math.round(count * 100) / 100;

        var key = `proc-cost${pl}`;
        if (body != null && body[key] !== 0) {
            procList[pl].cost = body[key];
        } else {
            procList[pl].cost = priceDB[procList[pl].name].value;
        }
        procList[pl].batchCost = Math.floor(procList[pl].cost * procList[pl].count);
        return procList;
    }
}

module.exports = {
    addToMaterialList,
    addToMaterialTree,
    checkProc,
    addToProcList
}