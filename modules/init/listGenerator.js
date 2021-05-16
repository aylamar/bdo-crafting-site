var prodList = require('../itemLists/prodList')
var cookList = require('../itemLists/cookList')
var craftList = require('../itemLists/craftList')

var listGenerator = async function listGenerator() {
    cookListGenerator();
    prodListGenerator();
    craftListGenerator();
    return;
}

var cookListGenerator = function cookListGenerator() {
    Object.keys(cookList).forEach(element => {
        cookList[element].name = element;
        cookList[element].img = imgGenerator(element);
        cookList[element].link = linkGenerator(element, 'cooking');
    });
    return;
}

var prodListGenerator = function prodListGenerator() {
    Object.keys(prodList).forEach(element => {
        prodList[element].name = element;
        prodList[element].img = imgGenerator(element);
        prodList[element].link = linkGenerator(element, 'production');
    });
    return;
}

var craftListGenerator = function craftListGenerator() {
    Object.keys(craftList).forEach(element => {
        craftList[element].name = element;
        craftList[element].img = imgGenerator(element);
        craftList[element].link = linkGenerator(element, 'crafting');
    })
    return;
}

var linkGenerator = function linkGenerator (val, type) {
    return '/' + type  + '/calc?item=' + val.replace(/ /g,"_");
}

var imgGenerator = function imgGenerator (val) {
    return 'https://cdn.aylamar.com/assets/img/' + val.toLowerCase().replace(/ /g,"-") + ".png";
}

module.exports = {listGenerator, cookListGenerator, prodListGenerator, linkGenerator, imgGenerator};