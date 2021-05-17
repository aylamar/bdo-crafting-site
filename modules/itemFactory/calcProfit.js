function calcProfit(profit, materialList, procList, userInput, type) {

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
    profit.taxable = (profit.taxableProcBatch + profit.taxableBatch) / userInput.craftsMastery;

    profit.taxBatch = (profit.taxable * (1 - userInput.tax)) * userInput.craftsMastery;
    profit.taxValue = profit.taxBatch / userInput.craftsMastery;

    switch (type) {
        case 'production':
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
            break;
            // Tested and working with both cooking and processing
        default:
            profit.totalValue = profit.itemValue + (profit.taxableProcBatch / userInput.craftsMastery);
            profit.profit = profit.totalValue - profit.singlePrice - profit.taxValue;
    }
    profit.totalBatch = profit.totalValue * userInput.craftsMastery;
    profit.profitBatch = profit.profit * userInput.craftsMastery;
}

module.exports = {
    calcProfit,
}