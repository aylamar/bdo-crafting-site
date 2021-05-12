var craftList = require('../craftList')
var cookList = require('../cookList')

var listGenerator = async function listGenerator() {
    cookListGenerator();
    prodListGenerator();
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
    Object.keys(craftList).forEach(element => {
        craftList[element].name = element;
        craftList[element].img = imgGenerator(element);
        craftList[element].link = linkGenerator(element, 'production');
    });
    return;
}

var linkGenerator = function linkGenerator (val, type) {
    return '/' + type  + '/calc?item=' + val.replace(/ /g,"_");
}

var imgGenerator = function imgGenerator (val) {
    return 'img/' + val.toLowerCase().replace(/ /g,"-") + ".png";
}

module.exports = {listGenerator, cookListGenerator, prodListGenerator, linkGenerator, imgGenerator};