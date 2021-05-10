// Import 'databases'
const itemDB = require('./itemDB');
const priceDB = require('./priceDB');
const cookingMastery = require('./cookMastery');
const e = require('express');


var crateCalc = function crateCalc(queryInput, type, body) {
    var profit = {};
    var userInput = {
        crafts: 1,
        craftsMastery: 1,
        masteryVal: 0,
        processingAvg: 2.5,
        processingProcAvg: 0.05,
        tax: 0.845,
        distance: 113.85,
        bargain: 0.3,
        desert: 0.5
    };
    var materialTree = [];
    var materialList = [];
    var procList = [];

    // Initialize and import values from form
    function init() {
        userInput.itemDirty = queryInput;
        userInput.item = query;
        if (body != null) {
            userInput.crafts = body.crafts;
            userInput.craftsMastery = userInput.crafts;
            userInput.processingAvg = 2.5; //body.processingAvg;
            userInput.processingProcAvg = 0.05 //body.processingProcAvg;
            if (type === 'production') {
                if (queryInput.includes('Crate')) {
                    profit.itemValue = priceDB[userInput.item].value;
                    userInput.distance = body.distance;
                    userInput.bargain = body.bargain;
                    if (body.desertStatus === 'on') {
                        userInput.desert = 0.5;
                    } else {
                        userInput.desert = 0;
                    }
                } else {
                    profit.itemValue = Number(body.itemValue);
                    userInput.distance = 0;
                    userInput.bargain = 0;
                    userInput.desert = 0;
                }
            } else if (type === 'cooking') {
                if (body != null) {
                    userInput.crafts = body.crafts;
                    userInput.processingAvg = 2.5; //body.processingAvg;
                    userInput.masteryVal = body.cookingMastery;
                    profit.itemValue = Number(body.itemValue);
                } else {
                    profit.itemValue = priceDB[userInput.item].value;
                }
                userInput.masteryCook = cookingMastery[userInput.masteryVal].cook;
                userInput.masteryProc = cookingMastery[userInput.masteryVal].proc;
                userInput.craftsMastery = userInput.crafts * userInput.masteryCook;
            }
        } else if (type === 'cooking') {
            userInput.masteryCook = cookingMastery[userInput.masteryVal].cook;
            userInput.masteryProc = cookingMastery[userInput.masteryVal].proc;
            userInput.craftsMastery = userInput.crafts * userInput.masteryCook;
            profit.itemValue = priceDB[userInput.item].value;
        } else {
            profit.itemValue = priceDB[userInput.item].value;
        }
    }

    var ml = 0; // Used for tracking materials
    // Add materials to material list
    function addToMaterialList(name, count) {
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
                ml++
            }
        } else {
            materialList[i] = new Object();
            materialList[i].batchCost = 0;
            materialList[i].count = 0;
            ml++
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
        materialList[i].batchCost += Number(materialList[i].cost * materialList[i].count);
    }

    var pl = 0; // Used for tracking proc material list

    function addToProcList(name, count) {
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
        pl++;
    }

    var mt = 0; // Used for tracking values in material tree
    // Add materials to material tree
    function addToMaterialTree(name, column, count, totalCount, multi) {
        materialTree[mt] = new Object();
        materialTree[mt] = { name, imageName: 'placeholder', column, count, totalCount: Math.ceil(Math.max(totalCount, count)), multiPart: multi };
        mt++;
    }

    function checkProc(thingToCheck, craftAmount) {
        if (typeof itemDB[thingToCheck].proc !== "undefined") {
            addToProcList(itemDB[thingToCheck].proc, (craftAmount * userInput.masteryProc));
        }
    }

    // Setup variables for calcCraft()
    var col = 0; // Used for tracking depth for material chart

    function calcCraft(thingToCraft, craftAmount) {
        // Define objects
        //console.log(thingToCraft)
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

        if (typeof proc !== "undefined" && type === 'cooking' && userInput.item != thingToCraft) {
            addToProcList(proc, (craftAmount * userInput.masteryProc / userInput.masteryCook))
        }

        // For each entry in "mats", run function
        Object.entries(mats).forEach(element => {
            switch (status[i]) {
                case 'craft':
                    if (thingToCraft === userInput.item) {
                        if (type === 'cooking') {
                            addToMaterialTree(mats[i], col, reqs[i], craftAmount, multi[i]);
                        } else if (type === 'production') {
                            addToMaterialTree(mats[i], col, reqs[i], craftAmount * reqs[i] / userInput.processingAvg, multi[i]);
                        }
                    } else {
                        if (type === 'cooking') {
                            addToMaterialTree(mats[i], col, reqs[i], round(reqs[i] * craftAmount / userInput.masteryCook, reqs[i]), multi[i], multi[i]);
                        } else if (type === 'production') {
                            addToMaterialTree(mats[i], col, reqs[i], round(reqs[i] * craftAmount / userInput.processingAvg, reqs[i]), multi[i], multi[i]);
                        }
                    }
                    col++;
                    calcCraft(mats[i], craftAmount * reqs[i] / userInput.processingAvg);
                    break;
                case 'baseCraft':
                    // Calculate proc if proc exists
                    if (typeof proc !== "undefined" && type === 'cooking') {
                        addToProcList(proc[i], (craftAmount * (userInput.processingProcAvg / userInput.masteryProc)))
                    } else if (typeof proc !== "undefined" && type === 'production') {
                        addToProcList(proc[i], (craftAmount * (userInput.processingProcAvg / userInput.processingAvg)))
                    }

                    if (thingToCraft === userInput.item) {
                        addToMaterialList(mats[i], round(craftAmount * reqs[i], reqs[i]));
                        addToMaterialTree(mats[i], col, reqs[i], round(reqs[i] * craftAmount, reqs[i]), multi[i]);
                    } else {
                        if (type === 'cooking') {
                            addToMaterialList(mats[i], round(reqs[i] * craftAmount / userInput.masteryCook, reqs[i]));
                            addToMaterialTree(mats[i], col, reqs[i], round(reqs[i] * craftAmount / userInput.masteryCook, reqs[i]), multi[i]);
                        } else if (type === 'production') {
                            addToMaterialList(mats[i], round(reqs[i] * craftAmount / userInput.processingAvg, reqs[i]));
                            addToMaterialTree(mats[i], col, reqs[i], round(reqs[i] * craftAmount / userInput.processingAvg, reqs[i]), multi[i]);
                        }
                    }
                    break;
                case 'buy':
                    if (thingToCraft === userInput.item) {
                        if (type === 'cooking') {
                            addToMaterialList(mats[i], round(reqs[i] * craftAmount, reqs[i]))
                            addToMaterialTree(mats[i], col, reqs[i], round(reqs[i] * craftAmount, reqs[i]), multi[i]);
                        } else if (type === 'production') {
                            addToMaterialList(mats[i], round(reqs[i] * craftAmount, reqs[i]))
                            addToMaterialTree(mats[i], col, reqs[i], round(reqs[i] * craftAmount, reqs[i]), multi[i]);
                        }
                    } else {
                        if (type === 'cooking') {
                            addToMaterialList(mats[i], round(reqs[i] * craftAmount / userInput.masteryCook, reqs[i]))
                            addToMaterialTree(mats[i], col, reqs[i], round(reqs[i] * craftAmount / userInput.masteryCook, reqs[i]), multi[i]);
                        } else if (type === 'production') {
                            addToMaterialList(mats[i], round(reqs[i] * craftAmount / userInput.processingAvg, reqs[i]))
                            addToMaterialTree(mats[i], col, reqs[i], round(reqs[i] * craftAmount / userInput.processingAvg, reqs[i]), multi[i]);
                        }
                    }
                    break;
                case 'single':
                    if (thingToCraft === userInput.item) {
                        addToMaterialTree(mats[i], col, reqs[i], reqs[i] * craftAmount, multi[i]);
                        col++;
                        calcCraft(mats[i], reqs[i] * craftAmount);
                    } else {
                        addToMaterialTree(mats[i], col, reqs[i], round(reqs[i] * craftAmount / userInput.masteryCook, reqs[i]), multi[i]);
                        col++;
                        calcCraft(mats[i], round(reqs[i] * craftAmount / userInput.masteryCook, reqs[i]));
                    }
                    break;
                default:
                    console.error('Default case for itemCalc triggered with: ', thingToCraft, craftAmount)
            }
            i++;
            if (col > 0 && multi[i - 1] === false) {
                col--;
            }
        });
        return materialList;
    }

    // Calculate crate profit
    function calcProfit() {

        var i = 0;
        var j = 0;

        // Generate batch price for material list
        profit.batchPrice = 0;
        Object.entries(materialList).forEach(element => {
            profit.batchPrice += materialList[i].cost * materialList[i].count;
            i++;
        });

        // Generate batch price for proc list
        profit.taxableProcBatch = 0;
        Object.entries(procList).forEach(element => {
            profit.taxableProcBatch += procList[j].cost * procList[j].count;
            j++;
        });

        // Generate tax bax if not a crate
        profit.taxableBatch = 0;
        profit.itemBatch = profit.itemValue * userInput.craftsMastery;
        if (!userInput.item.includes('Crate')) {
            profit.taxableBatch += profit.itemBatch;
        };

        profit.singlePrice = profit.batchPrice / userInput.craftsMastery;
        profit.taxable = (profit.taxableProcBatch + profit.taxableBatch) / userInput.craftsMastery;

        profit.taxBatch = (profit.taxable * (1 - userInput.tax)) * userInput.craftsMastery;
        profit.taxValue = profit.taxBatch / userInput.craftsMastery;

        if (type === 'cooking') {
            profit.totalValue = profit.itemValue + (profit.taxableProcBatch / userInput.craftsMastery);
            profit.profit = profit.totalValue - profit.singlePrice - profit.taxValue;
        } else if (type === 'production') {
            if (userInput.item.includes('Crate')) {
                profit.distanceValue = (userInput.distance / 100) * profit.itemValue;
                profit.distanceBatch = profit.distanceValue * userInput.craftsMastery;
                profit.bargainValue = (profit.itemValue + profit.distanceValue) * userInput.bargain;
                profit.bargainBatch = profit.bargainValue * userInput.craftsMastery;
                profit.desertValue = (profit.itemValue + profit.distanceValue + profit.bargainValue) * userInput.desert;
                profit.desertBatch = profit.desertValue * userInput.craftsMastery;
                profit.totalValue = profit.itemValue + profit.distanceValue + profit.bargainValue + profit.desertValue;
                profit.profit = profit.totalValue - profit.singlePrice - profit.taxValue + (profit.taxableProcBatch / userInput.craftsMastery);
            } else {
                profit.distanceValue = 0;
                profit.distanceBatch = 0;
                profit.bargainValue = 0;
                profit.bargainBatch = 0;
                profit.desertValue = 0;
                profit.desertBatch = 0;
                profit.totalValue = profit.itemValue + profit.distanceValue + (profit.taxableProcBatch / userInput.craftsMastery) + profit.bargainValue + profit.desertValue;
                profit.profit = profit.totalValue - profit.singlePrice - profit.taxValue;

            }
        }

        profit.totalBatch = profit.totalValue * userInput.craftsMastery;
        profit.profitBatch = profit.profit * userInput.craftsMastery;
    }

    // Truncate all numbers and add commas for readability
    function beautify() {

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

    // Replace _ with space
    const query = queryInput.replace(/_/g, ' ');

    init();

    checkProc(query, userInput.crafts);
    calcCraft(query, userInput.crafts);
    calcProfit();
    beautify();

    /* Test Code
    console.log('UserInputs: ', userInput)
    console.log('Material List:', materialList)
    console.log('Proc List:', procList)
    console.log('Material Tree:', materialTree)
    */

    return {
        userInput: userInput,
        profit: profit,
        materialTree: materialTree,
        materialList: materialList,
        procList: procList,
    }

    // ----------------------------------
    // Outputs
    // profit: value: price
    // materialList: name, count, cost, batchCost
    // procList: name, count, cost, batchCost
    // materialTree: name, column, count, totalCount, multiPart

    // Truncate + add commas
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
};

module.exports = crateCalc;