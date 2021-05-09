// Import 'databases'
const itemDB = require('./itemDB');
const priceDB = require('./priceDB');
const cookingMastery = require('./cookMastery');


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
            if (type === 'prod') {
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
            } else if ( type === 'cook') {
                if (body != null) {
                    userInput.crafts = body.crafts;
                    userInput.processingAvg = 2.5; //body.processingAvg;
                    userInput.masteryVal = body.cookingMastery;
                    profit.itemValue = Number(body.itemValue);
                } else {
                    profit.itemValue = priceDB[userInput.item].value;
                }
                userInput.masteryCook = cookingMastery[userInput.masteryVal].cook
                userInput.masteryProc = cookingMastery[userInput.masteryVal].proc
                userInput.craftsMastery = userInput.crafts * userInput.masteryCook;            
            }
        } else if (type === 'cook') {
            userInput.masteryCook = cookingMastery[userInput.masteryVal].cook
            userInput.masteryProc = cookingMastery[userInput.masteryVal].proc
            userInput.craftsMastery = userInput.crafts * userInput.masteryCook;
            profit.itemValue = priceDB[userInput.item].value;
        } else {
            profit.itemValue = priceDB[userInput.item].value;
        }
    }

    var ml = 0; // Used for tracking materials
    // Add materials to material list
    function addToMaterialList (name, count) {
        materialList[ml] = new Object();
        materialList[ml].name = name;
        materialList[ml].count = count;

        var key = `material-cost${ml}`;
        if (body != null && body[key] !== 0) {
                materialList[ml].cost = body[key];
        } else {
            if (materialList[ml].name === 'Grain') {
                var avg = 0;
                avg += priceDB['Barley'].value;
                avg += priceDB['Corn'].value;
                avg += priceDB['Potato'].value;
                avg += priceDB['Sweet Potato'].value;
                avg += priceDB['Wheat'].value;
                avg = avg / 5;
                materialList[ml].cost = avg;
            } else {
            materialList[ml].cost = priceDB[materialList[ml].name].value;
            }
        }
        materialList[ml].batchCost = Math.floor(materialList[ml].cost * materialList[ml].count);
        ml++;
    }

    var pl = 0; // Used for tracking proc material list

    function addToProcList (name, count) {
        procList[pl] = new Object();
        procList[pl].name = name;
        procList[pl].count = count;

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
    function addToMaterialTree (name, column, count, totalCount, multi) {
        materialTree[mt] = new Object();
        materialTree[mt].name = name;
        materialTree[mt].imageName = 'placeholder';
        materialTree[mt].column = column;
        materialTree[mt].count = count;
        materialTree[mt].totalCount = totalCount;
        materialTree[mt].multiPart = multi;
        mt++;
    }

    function checkProc (thingToCheck, craftAmount) {
        if (typeof itemDB[thingToCheck].proc !== "undefined") {
            addToProcList(itemDB[thingToCheck].proc, (craftAmount * userInput.masteryProc));
        }
    }

    // Setup variables for calcCraft()
    var col = 0; // Used for tracking depth for material chart

    function calcCraft(thingToCraft, craftAmount) {

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

       // For each entry in "mats", run function
        Object.entries(mats).forEach(element => {
            switch (status[i]) {
                case 'cook':
                    checkProc(proc[i], craftAmount * userInput.masteryProc)
                    addToMaterialTree(mats[i], col, reqs[i], reqs[i] * craftAmount / userInput.masteryProc, multi[i]);
                    col++;
                    calcCraft(mats[i], reqs[i] * craftAmount / userInput.masteryProc);
                    break;
                case 'baseCook':
                    checkProc(proc[i], craftAmount * userInput.masteryProc)
                    addToMaterialList(mats[i], reqs[i] * craftAmount / userInput.masteryCook);
                    addToMaterialTree(mats[i], col, reqs[i], reqs[i] * craftAmount / userInput.masteryCook, multi[i]);

                    // Determine if overhead item is a multi part, and if so, only subtract one from column
                    if (materialTree[mt-2].multiPart === true) {
                        col--;
                    } else {
                        col=0;
                    }
                    break;
                case 'craft':
                    addToMaterialTree(mats[i], col, reqs[i], reqs[i] * craftAmount / userInput.processingAvg, multi[i]);
                    col++;
                    calcCraft(mats[i], reqs[i] * craftAmount / userInput.processingAvg);
                    break;
                case 'baseCraft':
                    // Calculate proc if proc exists
                    if (typeof proc !== "undefined") {
                        addToProcList(proc[i], (craftAmount * (userInput.processingProcAvg / userInput.processingAvg)))
                    }
                    addToMaterialList(mats[i], reqs[i] * craftAmount / userInput.processingAvg);
                    addToMaterialTree(mats[i], col, reqs[i], reqs[i] * craftAmount / userInput.processingAvg, multi[i]);
                    
                    // Determine if overhead item is a multi part, and if so, only subtract one from column
                    if (materialTree[mt-2].multiPart === true) {
                        col--;
                    } else {
                        col=0;
                    }
                    break;
                case 'buy':
                    addToMaterialList(mats[i], reqs[i] * craftAmount)
                    addToMaterialTree(mats[i], col, reqs[i], materialList[i].count, multi[i]);
                    col=0;
                    break;
                case 'buy-craft':
                    addToMaterialList(mats[i], reqs[i] * craftAmount / userInput.processingAvg)
                    addToMaterialTree(mats[i], col, reqs[i], reqs[i] * craftAmount / userInput.processingAvg, multi[i]);
                    col=0;
                    break;    
                case 'single':
                    addToMaterialTree(mats[i], col, reqs[i], reqs[i] * craftAmount, multi[i]);
                    col++;
                    calcCraft(mats[i], (reqs[i] * craftAmount));
                    break;
                default:
                    break;
            }
            i++;
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
        profit.taxable = (profit.taxableProcBatch + profit.taxableBatch)/ userInput.craftsMastery;

        profit.taxBatch = (profit.taxable * (1 - userInput.tax)) * userInput.craftsMastery;
        profit.taxValue = profit.taxBatch / userInput.craftsMastery;

        if (type === 'cook') {
            profit.totalValue = profit.itemValue + (profit.taxableProcBatch / userInput.craftsMastery);
            profit.profit = profit.totalValue - profit.singlePrice - profit.taxValue;    
        } else if (type === 'prod') {
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
        return val.replace(/ /g,"-").toLowerCase();
    }
};

module.exports = crateCalc;