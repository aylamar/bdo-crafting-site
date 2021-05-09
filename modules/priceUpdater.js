//Import dependencies
const getPrice = require('./getPrice');
var priceDB = require('./priceDB');
const fetch = require('node-fetch');

async function priceUpdater() {
    console.log('Gathering Prices...');
    // Gather non-bulk prices
    for (var key in priceDB) {

        //Function information:
        //priceDB[key].value = value/price of item
        //priceDB[key].id = id

        if (priceDB[key].search === true) {
            priceDB[key].value = await getPrice(priceDB[key].id);
            console.log(priceDB[key])
        } else {
            priceDB[key].value = 0;
        }
    }
    console.log('Done gathering prices!')

    // Gather bulk cooking prices
    var cookPrices = await fetch(`https://bdo-api-helper.herokuapp.com/api/prices/cooking?region=na`);
    var cookParsed = await cookPrices.json();
    var i = 0;

    cookParsed.forEach(element => {
        priceDB[cookParsed[i].name].value = cookParsed[i].price;
        i++
    });
    console.log('Done gathering cooking ingredient prices!')
}



module.exports = priceUpdater;