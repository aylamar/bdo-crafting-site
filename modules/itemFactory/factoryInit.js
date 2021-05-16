const priceDB = require('../priceDB');
const cookingMastery = require('../references/cookMastery')

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
            userInput.buy.push(body.buy)
        } else if (typeof body.buy === 'object') {
            userInput.buy = body.buy
        } else {
            userInput.buy = [];
        }

        // Sets baseline crafts & averages
        userInput.craftsMastery = userInput.crafts;
        userInput.processingAvg = 2.5; //body.processingAvg;
        userInput.processingProcAvg = 0.05 //body.processingProcAvg;

        // Sets up values needed for specific types of calculation
        switch(type) {
            case 'production':
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
                break;
            case 'cooking':
                userInput.masteryVal = body.cookingMastery;
                profit.itemValue = Number(body.itemValue);
                userInput.masteryCook = cookingMastery[userInput.masteryVal].cook;
                userInput.masteryProc = cookingMastery[userInput.masteryVal].proc;
                // If cooking box, do not apply mastery to final output
                if (query.includes('Cooking Box')) {
                    userInput.craftsMastery = userInput.crafts
                    profit.itemValue = priceDB[userInput.item].value * (2.5 + cookingMastery[userInput.masteryVal].imperialBonus);
                } else {
                    userInput.craftsMastery = userInput.crafts * userInput.masteryCook;
                }
                break;
            case 'crafting':
                userInput.craftsMastery = userInput.crafts * userInput.processingAvg
                profit.itemValue = Number(body.itemValue);
                break;
        }

    // Begin if first run or body is null
    } else {
        userInput.buy = [];
        switch (type){
            case 'cooking':
                userInput.masteryVal = '1000';
                userInput.masteryCook = cookingMastery[userInput.masteryVal].cook;
                userInput.masteryProc = cookingMastery[userInput.masteryVal].proc;
                // If cooking box, do not apply mastery to final output
                if (query.includes('Cooking Box')) {
                    userInput.craftsMastery = userInput.crafts
                    profit.itemValue = priceDB[userInput.item].value * (2.5 + cookingMastery[userInput.masteryVal].imperialBonus);
                } else {
                    userInput.craftsMastery = userInput.crafts * userInput.masteryCook;
                    profit.itemValue = priceDB[userInput.item].value;
                }
                break;
            case 'crafting':
                userInput.craftsMastery = userInput.crafts * userInput.processingAvg;
                profit.itemValue = priceDB[userInput.item].value;
                break;
            default:
                profit.itemValue = priceDB[userInput.item].value;
                break;
        }
    }
    return userInput, profit;
}

module.exports = {
    factoryInit,
}