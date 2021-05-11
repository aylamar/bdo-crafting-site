const priceDB = require('../priceDB');
const cookingMastery = require('../cookMastery')

var factoryInit = function factoryInit(userInput, profit, queryInput, type, body) {
    const query = queryInput.replace(/_/g, ' ');

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

    return userInput, profit;
}

module.exports = {
    factoryInit,
}