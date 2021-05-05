// Import 'databases'
const itemDB = require('./itemDB');
const priceDB = require('./priceDB');

var crateCalc = function crateCalc(queryInput, body) {
    var output = {};
    var itemName = {};
    var basePrice = {};
    var batchPrice = {};
    var profit = {
        batchPrice: 0
    };
    var userInput = {
        crafts: 1,
        processingAvg: 2.5,
        processingProcAvg: 0.05,
        tax: 0.845,
        distance: 113.85,
        bargain: 0.3,
        desert: 0.5
    };
    var procItems = {};
    var procOutput = {};
    var procPrice = {};
    var procBatch = {};
    var materialTree = [];

    // Initialize and import values from form
    function init() {
        if (body != null) {
            userInput.crafts = body.crafts;
            userInput.processingAvg = body.processingAvg;
            userInput.processingProcAvg = body.processingProcAvg;
            userInput.distance = body.distance;
            userInput.bargain = body.bargain;
            if (body.desertStatus === 'on') {
                userInput.desert = 0.5;
            } else {
                userInput.desert = 0;

            }
        }
        userInput.crateDirty = queryInput;
        userInput.crate = query;
    }

    var m = 0; // Used for tracking values in material tree

    // Add materials to material tree
    function addToMaterialTree (name, column, count, totalCount) {
        materialTree[m] = new Object();
        materialTree[m].name = name;
        materialTree[m].column = column;
        materialTree[m].count = count;
        materialTree[m].totalCount = totalCount;
        m++;
    }

    // Setup variables for calcCraft()
    var j = 0; // Used for tracking material # from db
    var k = 0; // Used for tracking proc #
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
                    addToMaterialTree(mats[i], col, reqs[i], reqs[i] * craftAmount / userInput.processingAvg, multi[i])
                    col++;
                    calcCraft(mats[i], reqs[i] * craftAmount / userInput.processingAvg);
                    break;
                case 'baseCraft':
                    // Calculate proc if proc exists
                    if (typeof proc !== "undefined") {
                        procItems[k] = proc[i];
                        procOutput[k] = (craftAmount * (userInput.processingProcAvg / userInput.processingAvg));
                        k++;
                    }
                    output[mats[i]] = reqs[i] * craftAmount / userInput.processingAvg;
                    itemName[j] = mats[i];
                    addToMaterialTree(mats[i], col, reqs[i], output[mats[i]], multi[i])
                    
                    // Determine if overhead item is a multi part, and if so, only subtract one from column
                    if (materialTree[m-2].multiPart === true) {
                        col--;
                    } else {
                        col=0;
                    }

                    j++;
                    break;
                case 'buy':
                    output[mats[i]] = reqs[i] * craftAmount;
                    addToMaterialTree(mats[i], col, reqs[i], output[mats[i]], multi[i])
                    itemName[j] = mats[i];
                    col=0;
                    j++;
                    break;
                case 'single':
                    addToMaterialTree(mats[i], col, reqs[i], reqs[i] * craftAmount, multi[i])
                    col++;
                    calcCraft(mats[i], (reqs[i] * craftAmount));
                    break;
                default:
                    break;
            }
            i++;
        });
        return output;
    }

    function addToMaterialTree (name, column, count, totalCount, multi) {
        materialTree[m] = new Object();
        materialTree[m].name = name;
        materialTree[m].imageName = 'placeholder';
        materialTree[m].column = column;
        materialTree[m].count = count;
        materialTree[m].totalCount = totalCount;
        materialTree[m].multiPart = multi
        m++;
    }

    // Determine item prices
    function calcPrices() {
        profit.crateValue = priceDB[userInput.crate].value;
        i = 0;
        j = 0;

        // Calculate for normal items
        Object.entries(output).forEach(element => {
            if(body != null) {
                var key = `material-cost${i}`;
                if (body[key] !== 0) {
                    basePrice[i] = body[key];
                } else {
                    basePrice[i] = priceDB[Object.keys(output)[i]].value;
                }
            } else {
                basePrice[i] = priceDB[Object.keys(output)[i]].value;
            }
            batchPrice[i] = Math.floor(basePrice[i] * output[itemName[i]]);
            i++;
        });

        // Calculate for proc items
        Object.entries(procItems).forEach(element => {
            if(body != null) {
                var key = `proc-cost${j}`;
                if (body[key] !== 0) {
                    procPrice[j] = body[key];
                } else {
                    procPrice[j] = priceDB[Object.keys(output)[j]].value;
                }
            } else {
                procPrice[j] = priceDB[procItems[j]].value;
            }
            procBatch[j] = Math.floor(procPrice[j] * procOutput[j]);
            j++;
        });
    }

    // Calculate crate profit
    function calcProfit() {
        var i = 0;
        var j = 0;
        profit.batchPrice = 0;
        Object.entries(basePrice).forEach(element => {
            profit.batchPrice += basePrice[i] * output[itemName[i]];
            i++;
        });
        profit.taxableBatch = 0;
        Object.entries(procPrice).forEach(element => {
            profit.taxableBatch += procPrice[j] * procOutput[j];
            j++;
        });
        profit.singlePrice = profit.batchPrice / userInput.crafts;
        profit.taxable = profit.taxableBatch / userInput.crafts;

        profit.taxBatch = (profit.taxable * (1 - userInput.tax)) * userInput.crafts;
        profit.taxValue = profit.taxBatch / userInput.crafts;
        profit.crateBatch = profit.crateValue * userInput.crafts;
        profit.distanceValue = (userInput.distance / 100) * profit.crateValue;
        profit.distanceBatch = profit.distanceValue * userInput.crafts;
        profit.bargainValue = (profit.crateValue + profit.distanceValue) * userInput.bargain;
        profit.bargainBatch = profit.bargainValue * userInput.crafts;
        profit.desertValue = (profit.crateValue + profit.distanceValue + profit.bargainValue) * userInput.desert;
        profit.desertBatch = profit.desertValue * userInput.crafts;
        profit.totalValue = profit.crateValue + profit.distanceValue + profit.bargainValue + profit.desertValue;
        profit.totalBatch = profit.totalValue * userInput.crafts;
        profit.profit = profit.totalValue + profit.taxable - profit.singlePrice - profit.taxValue;
        profit.profitBatch = profit.profit * userInput.crafts;
    }

    // Truncate all numbers and add commas for readability
    function beautify() {
        Object.entries(profit).forEach(element => {
            if (element[0] !== 'crateValue') {
                profit[element[0]] = prep(profit[element[0]]);
            } else {}
        })
        Object.entries(batchPrice).forEach(element => {
            batchPrice[element[0]] = prep(batchPrice[element[0]]);
        })
        Object.entries(procBatch).forEach(element => {
            procBatch[element[0]] = prep(procBatch[element[0]]);
        })
        Object.entries(materialTree).forEach(element => {
            materialTree[element[0]].imageName = prepImage(materialTree[element[0]].name);
        })
    }

    // Replace _ with space
    const query = queryInput.replace(/_/g, ' ');

    init();
    calcCraft(query, userInput.crafts);
    calcPrices();
    calcProfit();
    beautify();

    /* Test Code
    console.log('UserInputs: ', userInput)
    console.log('Amount: ', itemName);
    console.log('Output:', output);
    console.log('BasePrice: ', basePrice);
    console.log('BatchPrice: ', batchPrice);
    console.log('Profit: ', profit);
    console.log('Proc Items + output: ', procItems, procOutput);
    console.log('Material Tree:', materialTree)
    */

    return {
        userInput: userInput,
        itemName: itemName,
        output: output,
        basePrice: basePrice,
        batchPrice: batchPrice,
        procItems: procItems,
        procOutput: procOutput,
        procPrice: procPrice,
        procBatch: procBatch,
        profit: profit,
        materialTree: materialTree,
    }

    // ----------------------------------
    // Outputs
    // itemName: idx: item name
    // output: [itemName]: craftCount
    // basePrice: idx: price
    // batchPrice: idx: price 
    // profit: value: price
    // procItems: idx: name
    // procOutput: idx: amount
    // procPrice: idx: amount
    // procBatch: idx: amount
    // materialTree: name, column, count, totalCount, multiPart

    // Truncate + add commas
    function prep(val) {
        return addCommas(truncate(val));
    }

    // Truncate decimal places
    function truncate(val) {
        return val.toFixed(0);
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