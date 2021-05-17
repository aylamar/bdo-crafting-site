var priceDB = require('../priceDB');

var regionGenerator = async function regionGenerator() {
    Object.keys(priceDB).forEach(element => {
        priceDB[element].eu = priceDB[element].na;
        priceDB[element].mena = priceDB[element].na;
        priceDB[element].sa = priceDB[element].na;
        priceDB[element].sea = priceDB[element].na;
    })
    return;
}

module.exports = { regionGenerator };