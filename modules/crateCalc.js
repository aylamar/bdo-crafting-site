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

    var j = 0; //used for tracking material # from db
    var k = 0; //used for tracking proc #

    function calcCraft(thingToCraft, craftAmount) {

        // Define objects
        var mats = itemDB[thingToCraft].mats;
        var reqs = itemDB[thingToCraft].matsReq;
        var status = itemDB[thingToCraft].status;
        var proc = itemDB[thingToCraft].proc;

        var i = 0; //used for tracking current item names

        // For each entry in "mats", run function
        Object.entries(mats).forEach(element => {
            switch (status[i]) {
                case 'craft':
                    calcCraft(mats[i], reqs[i] * craftAmount / userInput.processingAvg);
                    break;
                case 'baseCraft':
                    if (typeof proc !== "undefined"){
                        procItems[k] = proc[i];
                        procOutput[k] = (craftAmount * (userInput.processingProcAvg / userInput.processingAvg));
                        k++;
                    }
                    output[mats[i]] = reqs[i] * craftAmount / userInput.processingAvg;
                    itemName[j] = mats[i];
                    j++;
                    break;
                case 'buy':
                    output[mats[i]] = reqs[i] * craftAmount;
                    itemName[j] = mats[i];
                    j++;
                    break;
                case 'single':
                    calcCraft(mats[i], (reqs[i] * craftAmount));
                    break;
                default:
                    break;
            }
            i++;
        });
        return output;
    }

    // Determine item prices
    function calcPrices() {
        profit.crateValue = priceDB[userInput.crate].value;
        i = 0;
        j = 0;

        // Calculate for normal items
        Object.entries(output).forEach(element => {
            basePrice[i] = priceDB[Object.keys(output)[i]].value;
            batchPrice[i] = Math.floor(priceDB[Object.keys(output)[i]].value * output[itemName[i]]);
            i++;
        });

        // Calculate for proc items
        Object.entries(procItems).forEach(element => {
            procPrice[j] = priceDB[procItems[j]].value;
            procBatch[j] = Math.floor(priceDB[procItems[j]].value * procOutput[j]);
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

        k = 0;
        Object.entries(profit).forEach(element => {
            profit[element[0]] = Math.floor(profit[element[0]])
        })
    }

    // Replace _ with space
    const query = queryInput.replace(/_/g, ' ');

    init();
    calcCraft(query, userInput.crafts);
    calcPrices();
    calcProfit();

    /*Test Code
    console.log('UserInputs: ', userInput)
    console.log('Amount: ', itemName);
    console.log('Output:', output);
    console.log('BasePrice: ', basePrice);
    console.log('BatchPrice: ', batchPrice);
    console.log('Profit: ', profit);
    console.log('Proc Items + output: ', procItems, procOutput);
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
};

module.exports = crateCalc;