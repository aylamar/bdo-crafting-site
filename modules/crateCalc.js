// Import 'databases'
const itemDB = require('./itemDB');
const priceDB = require('./priceDB');

var crateCalc = function crateCalc(queryInput, body) {
    var profit = {};
    var userInput = {
        crafts: 1,
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
        if (body != null) {
            userInput.crafts = body.crafts;
            userInput.processingAvg = 2.5; //body.processingAvg;
            userInput.processingProcAvg = 0.05 //body.processingProcAvg;
            userInput.distance = body.distance;
            userInput.bargain = body.bargain;
            if (body.desertStatus === 'on') {
                userInput.desert = 0.5;
            } else {
                userInput.desert = 0;
            }
        }
        userInput.itemDirty = queryInput;
        userInput.item = query;
        profit.itemValue = priceDB[userInput.item].value;
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
            materialList[ml].cost = priceDB[materialList[ml].name].value;
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
        profit.batchPrice = 0;
        Object.entries(materialList).forEach(element => {
            profit.batchPrice += materialList[i].cost * materialList[i].count;
            i++;
        });
        profit.taxableBatch = 0;
        Object.entries(procList).forEach(element => {
            profit.taxableBatch += procList[j].cost * procList[j].count;
            j++;
        });
        profit.singlePrice = profit.batchPrice / userInput.crafts;
        profit.taxable = profit.taxableBatch / userInput.crafts;

        profit.taxBatch = (profit.taxable * (1 - userInput.tax)) * userInput.crafts;
        profit.taxValue = profit.taxBatch / userInput.crafts;
        profit.itemBatch = profit.itemValue * userInput.crafts;
        profit.distanceValue = (userInput.distance / 100) * profit.itemValue;
        profit.distanceBatch = profit.distanceValue * userInput.crafts;
        profit.bargainValue = (profit.itemValue + profit.distanceValue) * userInput.bargain;
        profit.bargainBatch = profit.bargainValue * userInput.crafts;
        profit.desertValue = (profit.itemValue + profit.distanceValue + profit.bargainValue) * userInput.desert;
        profit.desertBatch = profit.desertValue * userInput.crafts;
        profit.totalValue = profit.itemValue + profit.distanceValue + profit.bargainValue + profit.desertValue;
        profit.totalBatch = profit.totalValue * userInput.crafts;
        profit.profit = profit.totalValue + profit.taxable - profit.singlePrice - profit.taxValue;
        profit.profitBatch = profit.profit * userInput.crafts;
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