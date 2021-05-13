const { factoryInit } = require('./factoryInit');
const { calcCraft } = require('./calcCraft');
const { calcProfit } = require('./calcProfit');
const { beautify } = require('./beautify');
const { checkProc } = require('./addToLists');

var itemFactory = function itemFactory(queryInput, type, body) {
    var profit = {};
    var userInput = {
        crafts: 1,
        craftsMastery: 1,
        masteryVal: 0,
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
    var track = {
        col: 0
    }

    var data = { profit, userInput, materialTree, materialList, procList, track }

    const query = queryInput.replace(/_/g, ' ');

    factoryInit(data.userInput, data.profit, queryInput, type, body);

    checkProc(query, data.userInput.crafts, userInput, data.procList, body);
    calcCraft(data, query, userInput.crafts, type, body);
    calcProfit(data.profit, data.materialList, data.procList, data.userInput, type);
    beautify(data.profit, data.materialTree, data.materialList, data.procList);
    return data;
}

module.exports = {
    itemFactory,
}