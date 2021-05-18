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
        if (Number(body.crafts) > 10000000) {
            userInput.crafts = 10000000;
        } else {
            userInput.crafts = Number(body.crafts);
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
        userInput.cookCount = 0;
        
        // Sets up values needed for specific types of calculation
        switch(type) {
            case 'production':
                if (queryInput.includes('Crate')) {
                    profit.itemValue = setPrice(userInput.item, userInput.region, body.itemValue, body.loadPrices);
                    userInput.distance = body.distance;
                    userInput.bargain = body.bargain;
                    if (body.desertStatus === 'on') {
                        userInput.desert = 0.5;
                    } else {
                        userInput.desert = 0;
                    }
                } else {
                    profit.itemValue = setPrice(userInput.item, userInput.region, body.itemValue, body.loadPrices);
                    userInput.distance = 0;
                    userInput.bargain = 0;
                    userInput.desert = 0;
                }
                break;
            case 'cooking':
                userInput.masteryVal = body.cookingMastery;
                userInput.bypChoice = body.bypChoice;
                if (userInput.bypChoice === 'Cont') {
                    userInput.bypValue = 0;
                } else if (body.bypValue != 0) {
                    userInput.bypValue = setPrice(body.bypChoice, userInput.region, body.bypValue, body.loadPrices);
                } else {
                    userInput.bypValue = setPrice(body.bypChoice, userInput.region, body.bypValue, `on`);
                }
                userInput.masteryCook = cookingMastery[userInput.masteryVal].cook;
                userInput.masteryProc = cookingMastery[userInput.masteryVal].proc;
                userInput.craftsPerDura = cookingMastery[userInput.masteryVal].craftsPerDura;
                userInput.utensilPrice = setPrice('Advanced Cooking Utensil', userInput.region, body.utensilCost, body.loadPrices);
                // If cooking box, do not apply mastery to final output
                if (query.includes('Cooking Box')) {
                    userInput.cookCount = 0; // Set to 0 so cooking box is not counted to craft count
                    userInput.turnInMasteryVal = body.turnInMastery;
                    userInput.craftsMastery = userInput.crafts;
                    profit.itemValue = priceDB[userInput.item][userInput.region] * (2.5 + cookingMastery[userInput.turnInMasteryVal].imperialBonus);
                } else {
                    userInput.cookCount = Math.ceil(userInput.crafts / userInput.craftsPerDura);
                    profit.itemValue = setPrice(userInput.item, userInput.region, body.itemValue, body.loadPrices);
                    userInput.craftsMastery = userInput.crafts * userInput.masteryCook;
                }
                break;
            case 'processing':
                userInput.craftsMastery = userInput.crafts * userInput.processingAvg;
                profit.itemValue = setPrice(userInput.item, userInput.region, body.itemValue, body.loadPrices);
                break;
        }
    // Begin if first run or body is null
    } else {
        userInput.buy = [];
        switch (type){
            case 'cooking':
                userInput.masteryVal = 1150;
                userInput.bypChoice = 'Cont';
                userInput.bypValue = 0;
                userInput.masteryCook = cookingMastery[userInput.masteryVal].cook;
                userInput.masteryProc = cookingMastery[userInput.masteryVal].proc;
                userInput.craftsPerDura = cookingMastery[userInput.masteryVal].craftsPerDura;
                userInput.utensilPrice = priceDB['Advanced Cooking Utensil'][userInput.region];
                // If cooking box, do not apply mastery to final output
                if (query.includes('Cooking Box')) {
                    userInput.cookCount = 0; // Set to 0 so cooking box is not counted to craft count
                    userInput.turnInMasteryVal = 1300;
                    userInput.craftsMastery = userInput.crafts;
                    profit.itemValue = priceDB[userInput.item][userInput.region] * (2.5 + cookingMastery[userInput.turnInMasteryVal].imperialBonus);
                } else {
                    userInput.cookCount = Math.ceil(userInput.crafts / userInput.craftsPerDura);
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
var setPrice = function setPrice(item, region, bodyVal, loadPrices) {
    if(typeof loadPrices !== 'undefined') {
        return priceDB[item][region];
    } else {
        return Number(bodyVal);
    }
};

module.exports = {
    factoryInit,
};