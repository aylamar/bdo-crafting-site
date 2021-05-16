const itemDB = require('../itemDB');
const { addToMaterialList, addToMaterialTree, addToProcList } = require('./addToLists')

var calcCraft = function calcCraft(data, thingToCraft, craftAmount, type, body) {
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
            z++
        })
    } else {
        multi[0] = false;
        multi[1] = false;
        multi[2] = false;
    }

    if (typeof proc !== "undefined" && type === 'cooking' && data.userInput.item != thingToCraft) {
        addToProcList(data.procList, proc, (craftAmount * data.userInput.masteryProc / data.userInput.masteryCook), data.userInput, body)
    }

    // For each entry in "mats", run function
    Object.entries(mats).forEach(element => {
        switch (status[i]) {
            case 'craft':
                if (typeof data.userInput.buy !== 'undefined' && data.userInput.buy.includes(mats[i])) {
                    buy(data, thingToCraft, craftAmount, type, body, mats, reqs, multi, i);
                } else if (thingToCraft === data.userInput.item) {
                    if (type === 'cooking') {
                        addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], craftAmount, multi[i]);
                        data.track.col++;
                        calcCraft(data, mats[i], craftAmount * reqs[i] / data.userInput.processingAvg, type, body);
                    } else {
                        addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], craftAmount * reqs[i], multi[i]);
                        data.track.col++;
                        calcCraft(data, mats[i], craftAmount * reqs[i], type, body);        
                    }
                } else {
                    if (type === 'cooking') {
                        addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / data.userInput.masteryCook, reqs[i]), multi[i], multi[i]);
                    } else {
                        addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / data.userInput.processingAvg, reqs[i]), multi[i], multi[i]);
                    }
                    data.track.col++;
                    calcCraft(data, mats[i], craftAmount * reqs[i] / data.userInput.processingAvg, type, body);    
                }
                break;
            case 'baseCraft':
                // Calculate proc if proc exists
                if (typeof proc !== "undefined" && (type === 'production' || type === 'crafting')) {
                    addToProcList(data.procList, proc[i], (craftAmount * (data.userInput.processingProcAvg / data.userInput.processingAvg)), data.userInput, body)
                }
                if (type === 'cooking') {
                    addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount / data.userInput.masteryCook, reqs[i]), data.userInput, body);
                    addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / data.userInput.masteryCook, reqs[i]), multi[i]);
                } else {
                    addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount / data.userInput.processingAvg, reqs[i]), data.userInput, body);
                    addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / data.userInput.processingAvg, reqs[i]), multi[i]);
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
                    addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], reqs[i] * craftAmount, multi[i]);
                    data.track.col++;
                    calcCraft(data, mats[i], reqs[i] * craftAmount, type, body);
                } else {
                    addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / data.userInput.masteryCook, reqs[i]), multi[i]);
                    data.track.col++;
                    calcCraft(data, mats[i], round(reqs[i] * craftAmount / data.userInput.masteryCook, reqs[i]), type, body);
                }
                break;
            default:
                console.error('Default case for itemCalc triggered with: ', thingToCraft, craftAmount)
        }
        i++;
        if (data.track.col > 0 && multi[i - 1] === false) {
            data.track.col--;
        }
    });
}

function buy(data, thingToCraft, craftAmount, type, body, mats, reqs, multi, i) {
    if (thingToCraft === data.userInput.item) {
        if (type === 'cooking') {
            addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount, reqs[i]), data.userInput, body)
            addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount, reqs[i]), multi[i]);
        } else {
            addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount, reqs[i]), data.userInput, body)
            addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount, reqs[i]), multi[i]);
        }
    } else {
        if (type === 'cooking') {
            addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount / data.userInput.masteryCook, reqs[i]), data.userInput, body)
            addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / data.userInput.masteryCook, reqs[i]), multi[i]);
        } else {
            addToMaterialList(data.materialList, mats[i], round(reqs[i] * craftAmount / data.userInput.processingAvg, reqs[i]), data.userInput, body)
            addToMaterialTree(data.materialTree, mats[i], data.track.col, reqs[i], round(reqs[i] * craftAmount / data.userInput.processingAvg, reqs[i]), multi[i]);
        }
    }
}

function round(toRound, roundMulti) {
    return Math.ceil(toRound / roundMulti) * roundMulti;
}

module.exports = {
    calcCraft,
}