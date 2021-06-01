// Import Dependencies
const e = require('express');
const itemDB = require('../itemDB');
const cookingMastery = require('../references/cookMastery');
const { addToMaterialList, addToMaterialTree, addToProcList } = require('./addToLists');

var calcCraft = function calcCraft(data, thingToCraft, craftAmount, type, body, passedMasteryVal) {
    // Define objects
    var mats = itemDB[thingToCraft].mats; // Materials of thingToCraft
    var reqs = itemDB[thingToCraft].matsReq; // Number of materials needed of each material to craft
    var status = itemDB[thingToCraft].status; // Status of thing to craft [craft, buy, baseCraft, single]
    var proc = itemDB[thingToCraft].proc; // Displays procs when crafting, if any, otherwise null
    var multiPart = itemDB[thingToCraft].multiPart; // Displays if material requires multiple materials, otherwise undefined

    var i = 0; // Used for tracking current item names
    var multi = []; // Array for multiple items

    // Setup array for whether or not something is a multipart craft or not
    if (typeof multiPart !== "undefined") {
        z = 0;
        Object.entries(multiPart).forEach(element => {
            multi[z] = multiPart[z];
            z++;
        });
    } else {
        multi[0] = false;
        multi[1] = false;
        multi[2] = false;
    }

    if (typeof proc !== "undefined" && type === 'cooking' && data.userInput.item != thingToCraft) {
        addToProcList(data.procList, proc, (craftAmount * masteryProc / masteryCook), data.userInput, body);
    }

    // For each entry in "mats", run function
    Object.entries(mats).forEach(element => {
        // Used for setting mastery values

        if(body != null && typeof body[`${thingToCraft}-mastery`] !== 'undefined') {
            masteryVal = data.userInput.turnInMasteryVal;
            masteryCook = cookingMastery[masteryVal].cook;
            masteryProc = cookingMastery[masteryVal].proc;
            craftsPerDura = cookingMastery[masteryVal].craftsPerDura;
        } else {
            masteryVal = data.userInput.masteryVal;
            masteryCook = data.userInput.masteryCook;
            masteryProc = data.userInput.masteryProc;
            craftsPerDura = data.userInput.craftsPerDura;
        }
        
        switch (status[i]) {
            case 'craft':
                if (typeof data.userInput.buy !== 'undefined' && data.userInput.buy.includes(mats[i])) {
                    buy(data, thingToCraft, craftAmount, type, body, mats, reqs, multi, i);
                } else if (thingToCraft === data.userInput.item) {
                    if (type === 'cooking') {
                        addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], craftAmount, multi[i], false, masteryVal);
                        data.track.col++;
                        calcCraft(data, mats[i], craftAmount * reqs[i] / data.userInput.processingAvg, type, body);
                    } else {
                        addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], craftAmount * reqs[i], multi[i], false, masteryVal);
                        data.track.col++;
                        calcCraft(data, mats[i], craftAmount * reqs[i], type, body);
                    }
                } else {
                    if (type === 'cooking') {
                        addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / masteryCook, reqs[i]), multi[i], false, masteryVal);
                        data.track.col++;
                        passedMasteryVal = masteryCook;
                        // Working calc craft ?
                        calcCraft(data, mats[i], (reqs[i] * craftAmount / masteryCook) * reqs[i] / data.userInput.processingAvg, type, body);
                        // Old calc craft method, just in case
                        // calcCraft(data, mats[i], craftAmount * reqs[i] / data.userInput.processingAvg, type, body);
                    } else {
                        addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / data.userInput.processingAvg, reqs[i]), multi[i], false, masteryVal);
                        data.track.col++;
                        calcCraft(data, mats[i], craftAmount * reqs[i] / data.userInput.processingAvg, type, body);    
                    }
                }
                break;
            case 'baseCraft':
                // If thing to craft is being crafted, don't apply processing average to count
                if (thingToCraft === data.userInput.item) {
                    // Check if proc exists & add to list if it does
                    if (typeof proc !== "undefined") {
                        addToProcList(data.procList, proc[i], (craftAmount * (data.userInput.processingProcAvg)), data.userInput, body);
                    }
                    addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount, reqs[i]), data.userInput, body);
                    addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount, reqs[i]), multi[i], false, masteryVal);
                } else {
                    // Check if proc exists & add to list if it does
                    if (typeof proc !== "undefined" && (type === 'production' || type === 'processing')) {
                        addToProcList(data.procList, proc[i], (craftAmount * (data.userInput.processingProcAvg / data.userInput.processingAvg)), data.userInput, body);
                    }
                    if (type === 'cooking') {
                        addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount / masteryCook, reqs[i]), data.userInput, body);
                        addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / masteryCook, reqs[i]), multi[i], false, masteryVal);
                    } else {
                        addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount / data.userInput.processingAvg, reqs[i]), data.userInput, body);
                        addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / data.userInput.processingAvg, reqs[i]), multi[i], false, masteryVal);
                    }
                }
                break;
            case 'buy':
                buy(data, thingToCraft, craftAmount, type, body, mats, reqs, multi, i);
                break;
            case 'single':
                // Check if set to buy
                if (typeof data.userInput.buy !== 'undefined' && data.userInput.buy.includes(mats[i])) {
                    buy(data, thingToCraft, craftAmount, type, body, mats, reqs, multi, i);
                } else if (thingToCraft === data.userInput.item) {
                    data.userInput.cookCount += Math.ceil((reqs[i] * craftAmount / masteryCook) / craftsPerDura);
                    addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], reqs[i] * craftAmount, multi[i], true, masteryVal);
                    data.track.col++;
                    calcCraft(data, mats[i], reqs[i] * craftAmount, type, body);
                } else {
                    data.userInput.cookCount += Math.ceil((reqs[i] * craftAmount / masteryCook / masteryCook) / craftsPerDura);
                    addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / masteryCook, reqs[i]), multi[i], true, masteryVal);
                    data.track.col++;
                    calcCraft(data, mats[i], round(reqs[i] * craftAmount / masteryCook, reqs[i]), type, body);
                }
                break;
            default:
                console.error('Default case for itemCalc triggered with: ', thingToCraft, craftAmount);
        }
        i++;
        if (data.track.col > 0 && multi[i - 1] === false) {
            data.track.col--;
        }
    });
};

function buy(data, thingToCraft, craftAmount, type, body, mats, reqs, multi, i) {
    if (thingToCraft === data.userInput.item) {
        if (type === 'cooking') {
            addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount, reqs[i]), data.userInput, body);
            addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount, reqs[i]), multi[i], false, masteryVal);
        } else {
            addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount, reqs[i]), data.userInput, body);
            addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount, reqs[i]), multi[i], false, masteryVal);
        }
    } else {
        if (type === 'cooking') {
            addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount / masteryCook, reqs[i]), data.userInput, body);
            addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / masteryCook, reqs[i]), multi[i], false, masteryVal);
        } else {
            addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount / data.userInput.processingAvg, reqs[i]), data.userInput, body);
            addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / data.userInput.processingAvg, reqs[i]), multi[i], false, masteryVal);
        }
    }
}

function round(toRound, roundMulti) {
    return Math.ceil(toRound / roundMulti) * roundMulti;
}

module.exports = {
    calcCraft,
};