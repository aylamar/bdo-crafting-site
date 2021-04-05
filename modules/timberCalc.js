// Import 'databases'
const itemDB = require('./itemDB');
const priceDB = require('./priceDB');

var crateCalc = function crateCalc(queryInput, body) {
    var result = {};
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

    function init() {
        if (body != null) {
            userInput.crafts = body.crafts;
            userInput.processingAvg = body.processingAvg;
            userInput.processingProcAvg = body.processingProcAvg;
            userInput.distance = body.distance;
            userInput.bargain = body.bargain;
            if (body.desertStatus === 'on') {
                data.desert.count = 0.5;
            } else {
                data.desert.count = 0;

            }
        }
        userInput.crateDirty = queryInput;
        userInput.crate = query;
    }

    var j = 0;

    function calcCraft(thingToCraft, craftAmount) {

        // Define objects
        var mats = itemDB[thingToCraft].mats;
        var reqs = itemDB[thingToCraft].matsReq;
        var status = itemDB[thingToCraft].status;

        var i = 0;

        // For each entry in "mats", run function
        Object.entries(mats).forEach(element => {
            switch (status[i]) {
                case 'craft':
                    calcCraft(mats[i], reqs[i] * craftAmount / userInput.processingAvg);
                    break;
                case 'baseCraft':
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
        profit.crateValue = priceDB['Serendia Timber Crate'].value;
        i = 0;
        Object.entries(output).forEach(element => {
            basePrice[i] = priceDB[Object.keys(output)[i]].value;
            batchPrice[i] = priceDB[Object.keys(output)[i]].value * 1;
            i++;
        });
    }

    // Calculate crate profit
    function calcProfit() {
        var i = 0;
        profit.batchPrice = 0;
        Object.entries(batchPrice).forEach(element => {
            profit.batchPrice += batchPrice[i] * output[itemName[i]];
            i++;
        });
        profit.singlePrice = profit.batchPrice / userInput.crafts;

        profit.crateBatch = profit.crateValue * userInput.crafts;
        profit.distanceValue = Math.floor((userInput.distance / 100) * profit.crateValue);
        profit.distanceBatch = Math.floor(profit.distanceValue * userInput.crafts);
        profit.bargainValue = Math.floor((profit.crateValue + profit.distanceValue) * userInput.bargain);
        profit.bargainBatch = Math.floor(profit.bargainValue * userInput.crafts);
        profit.desertValue = Math.floor((profit.crateValue + profit.distanceValue + profit.bargainValue) * userInput.desert);
        profit.desertBatch = Math.floor(profit.desertValue * userInput.crafts);
        profit.totalValue = profit.crateValue + profit.distanceValue + profit.bargainValue + profit.desertValue;
        profit.totalBatch = profit.totalValue * userInput.crafts;
        profit.profit = profit.totalValue - profit.singlePrice;
        profit.profitBatch = profit.profit * userInput.crafts;
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
    */

    return {
        userInput: userInput,
        itemName: itemName,
        output: output,
        basePrice: basePrice,
        batchPrice: batchPrice,
        profit: profit
    }

    // ----------------------------------
    // Outputs
    // itemName: idx: item name
    // output: [itemName]: craftCount
    // basePrice: idx: price
    // batchPrice: idx: price 
    // profit: value: price
};

//crateCalc('Serendia_Timber_Crate', null)

module.exports = crateCalc;