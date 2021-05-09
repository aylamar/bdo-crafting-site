//Import dependencies
const getPrice = require('./getPrice');
var priceDB = require('./priceDB');
const fetch = require('node-fetch');

async function priceUpdater() {
    console.log('Gathering Prices...');
    // Gather bulk cooking prices
    var cookPrices = await fetch(`https://bdo-api-helper.herokuapp.com/api/prices/cooking?region=na`);
    var cookParsed = await cookPrices.json();
    var i = 0;

    cookParsed.forEach(element => {
        if (cookParsed[i].id !== null) {
            priceDB[cookParsed[i].name].value = cookParsed[i].price;
        }
        i++
    });

    console.log('Done gathering cooking ingredient prices!');

    // Gather non-bulk prices

    for (var key in priceDB) {

        //Function information:
        //priceDB[key].value = value/price of item
        //priceDB[key].id = id

        if (priceDB[key].search === true) {
            priceDB[key].value = await getPrice(priceDB[key].id);
        }
    }
    console.log('Done gathering ID specific prices!');
}



module.exports = priceUpdater;