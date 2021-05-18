var prodList = require('../itemLists/prodList');
var cookList = require('../itemLists/cookList');
var processingList = require('../itemLists/processingList');

var listGenerator = async function listGenerator() {
    cookListGenerator();
    prodListGenerator();
    processingListGenerator();
    return;
};

var cookListGenerator = function cookListGenerator() {
    Object.keys(cookList).forEach(element => {
        cookList[element].name = element;
        cookList[element].img = imgGenerator(element);
        cookList[element].link = linkGenerator(element, 'cooking');
    });
    return;
};

var prodListGenerator = function prodListGenerator() {
    Object.keys(prodList).forEach(element => {
        prodList[element].name = element;
        prodList[element].img = imgGenerator(element);
        prodList[element].link = linkGenerator(element, 'production');
    });
    return;
};

var processingListGenerator = function processingListGenerator() {
    Object.keys(processingList).forEach(element => {
        processingList[element].name = element;
        processingList[element].img = imgGenerator(element);
        processingList[element].link = linkGenerator(element, 'processing');
    });
    return;
};

var linkGenerator = function linkGenerator (val, type) {
    return '/' + type  + '/calc?item=' + val.replace(/ /g,"_");
};

var imgGenerator = function imgGenerator (val) {
    return '/assets/icon/' + val.toLowerCase().replace(/ /g,"-") + ".png";
};

module.exports = {listGenerator, cookListGenerator, prodListGenerator, processingListGenerator, linkGenerator, imgGenerator};