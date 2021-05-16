var priceDB = require('../priceDB');

var regionGenerator = async function regionGenerator() {
    Object.keys(priceDB).forEach(element => {
        priceDB[element].eu = priceDB[element].na
    })
    return;
}

module.exports = { regionGenerator };