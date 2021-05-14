const priceDB = require('../priceDB');
const cookingMastery = require('../cookMastery')

var factoryInit = function factoryInit(userInput, profit, queryInput, type, body) {
    const query = queryInput.replace(/_/g, ' ');

    userInput.itemDirty = queryInput;
    userInput.item = query;
    if (body != null) {
        if (body.crafts > 10000000) {
            userInput.crafts = 10000000;
        } else {
            userInput.crafts = body.crafts;
        }
        userInput.craftsMastery = userInput.crafts;
        userInput.processingAvg = 2.5; //body.processingAvg;
        userInput.processingProcAvg = 0.05 //body.processingProcAvg;
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
                userInput.craftsMastery = userInput.crafts * userInput.masteryCook;
                break;
            case 'crafting':
                userInput.craftsMastery = userInput.crafts * userInput.processingAvg
                profit.itemValue = Number(body.itemValue);
        }
    // Begin if body is not null
    } else {
        switch (type){
            case 'cooking':
                userInput.masteryVal = '1000';
                userInput.masteryCook = cookingMastery[userInput.masteryVal].cook;
                userInput.masteryProc = cookingMastery[userInput.masteryVal].proc;
                userInput.craftsMastery = userInput.crafts * userInput.masteryCook;
                profit.itemValue = priceDB[userInput.item].value;
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