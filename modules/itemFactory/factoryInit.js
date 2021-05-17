const priceDB = require('../priceDB');
const cookingMastery = require('../references/cookMastery');

var factoryInit = function factoryInit(userInput, profit, queryInput, type, body) {
    const query = queryInput.replace(/_/g, ' ');

    // Import item name
    userInput.itemDirty = queryInput;
    userInput.item = query;
    
    // Check if submitting data or first run
    if (body != null) {
        // Sets hard cap of 10,000,000 crafts
        if (body.crafts > 10000000) {
            userInput.crafts = 10000000;
        } else {
            userInput.crafts = body.crafts;
        }

        // Used to import buy items from material list 
        if (typeof body.buy === 'string') {
            userInput.buy = [];
            userInput.buy.push(body.buy);
        } else if (typeof body.buy === 'object') {
            userInput.buy = body.buy;
        } else {
            userInput.buy = [];
        }

        // Sets generic data
        userInput.tax = body.tax;
        userInput.region = body.region;
        userInput.craftsMastery = userInput.crafts;
        userInput.processingAvg = 2.5; //body.processingAvg;
        userInput.processingProcAvg = 0.05; //body.processingProcAvg;

        // Sets up values needed for specific types of calculation
        switch(type) {
            case 'production':
                if (queryInput.includes('Crate')) {
                    setPrice(userInput, profit, body);
                    userInput.distance = body.distance;
                    userInput.bargain = body.bargain;
                    if (body.desertStatus === 'on') {
                        userInput.desert = 0.5;
                    } else {
                        userInput.desert = 0;
                    }
                } else {
                    setPrice(userInput, profit, body);
                    userInput.distance = 0;
                    userInput.bargain = 0;
                    userInput.desert = 0;
                }
                break;
            case 'cooking':
                userInput.masteryVal = body.cookingMastery;
                userInput.masteryCook = cookingMastery[userInput.masteryVal].cook;
                userInput.masteryProc = cookingMastery[userInput.masteryVal].proc;
                // If cooking box, do not apply mastery to final output
                if (query.includes('Cooking Box')) {
                    userInput.turnInMasteryVal = body.turnInMastery;
                    userInput.craftsMastery = userInput.crafts;
                    profit.itemValue = priceDB[userInput.item][userInput.region] * (2.5 + cookingMastery[userInput.turnInMasteryVal].imperialBonus);
                } else {
                    setPrice(userInput, profit, body);
                    userInput.craftsMastery = userInput.crafts * userInput.masteryCook;
                }
                break;
            case 'processing':
                userInput.craftsMastery = userInput.crafts * userInput.processingAvg;
                setPrice(userInput, profit, body);
                break;
        }

    // Begin if first run or body is null
    } else {
        userInput.buy = [];
        switch (type){
            case 'cooking':
                userInput.masteryVal = 1150;
                userInput.masteryCook = cookingMastery[userInput.masteryVal].cook;
                userInput.masteryProc = cookingMastery[userInput.masteryVal].proc;
                // If cooking box, do not apply mastery to final output
                if (query.includes('Cooking Box')) {
                    userInput.turnInMasteryVal = 1300;
                    userInput.craftsMastery = userInput.crafts;
                    profit.itemValue = priceDB[userInput.item][userInput.region] * (2.5 + cookingMastery[userInput.turnInMasteryVal].imperialBonus);
                } else {
                    userInput.craftsMastery = userInput.crafts * userInput.masteryCook;
                    profit.itemValue = priceDB[userInput.item][userInput.region];
                }
                break;
            case 'processing':
                userInput.craftsMastery = userInput.crafts * userInput.processingAvg;
                profit.itemValue = priceDB[userInput.item][userInput.region];
                break;
            default:
                profit.itemValue = priceDB[userInput.item][userInput.region];
                break;
        }
    }
    return userInput, profit;
};

// Set price to body value if load price is undefined or not selected
var setPrice = function setPrice(userInput, profit, body) {
    if(typeof body.loadPrices !== 'undefined') {
        profit.itemValue = priceDB[userInput.item][userInput.region];
    } else {
        profit.itemValue = Number(body.itemValue);
    }
    return;
};

module.exports = {
    factoryInit,
};