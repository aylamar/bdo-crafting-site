// Import Dependencies
/*jshint -W069 */
const priceDB = require('../priceDB');
const itemDB = require('../itemDB');

var addToMaterialList = function addToMaterialList(materialList, name, count, userInput, body) {
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
            materialList[i] = {};
            materialList[i].batchCost = 0;
            materialList[i].count = 0;
        }
    } else {
        materialList[i] = {};
        materialList[i].batchCost = 0;
        materialList[i].count = 0;
    }
    materialList[i].name = name;
    materialList[i].count += count;

    if (body !== null && typeof body !== 'undefined' && typeof body[name] !== 'undefined' && typeof body.loadPrices === 'undefined') {
        materialList[i].cost = body[name];
    } else {
        var avg = 0;
        if (name === 'Grain') {
            avg += priceDB['Barley'][userInput.region];
            avg += priceDB['Corn'][userInput.region];
            avg += priceDB['Potato'][userInput.region];
            avg += priceDB['Sweet Potato'][userInput.region];
            avg += priceDB['Wheat'][userInput.region];
            avg = avg / 5;
            materialList[i].cost = avg;
        } else if (name === 'Flour') {
            avg += priceDB['Barley Flour'][userInput.region];
            avg += priceDB['Corn Flour'][userInput.region];
            avg += priceDB['Potato Flour'][userInput.region];
            avg += priceDB['Sweet Potato Flour'][userInput.region];
            avg += priceDB['Wheat Flour'][userInput.region];
            avg = avg / 5;
            materialList[i].cost = avg;
        } else if (name === 'Dough') {
            avg += priceDB['Barley Dough'][userInput.region];
            avg += priceDB['Corn Dough'][userInput.region];
            avg += priceDB['Potato Dough'][userInput.region];
            avg += priceDB['Sweet Potato Dough'][userInput.region];
            avg += priceDB['Wheat Dough'][userInput.region];
            avg = avg / 5;
            materialList[i].cost = avg;
         } else {
            materialList[i].cost = priceDB[materialList[i].name][userInput.region];
        }
    }
    if (typeof materialList[i].batchCost === "undefined") {
        materialList[i].batchCost = 0;
    }
    materialList[i].batchCost = Number(materialList[i].cost * materialList[i].count);
    return materialList;
};

var addToMaterialTree = function addToMaterialTree(materialTree, name, column, count, totalCount, multi, status, mastery) {
    var mt = materialTree.length;
    materialTree[mt] = {
        name,
        imageName: 'placeholder',
        column,
        count,
        totalCount: Math.ceil(Math.max(totalCount, count)),
        multiPart: multi,
        cook: status,
        mastery
    };

    return materialTree;
};

var checkProc = function checkProc(thingToCheck, craftAmount, userInput, procList, body) {
    if (typeof itemDB[thingToCheck].proc !== "undefined") {
        addToProcList(procList, itemDB[thingToCheck].proc, (craftAmount * userInput.masteryProc), userInput, body);
    }
};

var addToProcList = function addToProcList(procList, name, count, userInput, body) {
    if (name === userInput.item) {
        userInput.craftsMastery += count;
    } else {
        pl = procList.length;
        procList[pl] = {};
        procList[pl].name = name;
        procList[pl].count = Math.round(count * 100) / 100;

        if (body != null && typeof body[name] !== 'undefined' && typeof body.loadPrices === 'undefined') {
            procList[pl].cost = body[name];
        } else {
            procList[pl].cost = priceDB[procList[pl].name][userInput.region];
        }
        procList[pl].batchCost = Math.floor(procList[pl].cost * procList[pl].count);
        return procList;
    }
};

module.exports = {
    addToMaterialList,
    addToMaterialTree,
    checkProc,
    addToProcList
};