//Import dependencies
const getPrice = require('./getPrice');
var prodPriceDB = require('./prodPriceDB');


async function priceUpdater() {
    console.log('Gathering Prices...');
    //console.log(await getPrice(priceDB['Maple Timber'].id));

    for (var key in prodPriceDB) {

        //Function information:
        //prodPriceDB[key].value = value/price of item
        //prodPriceDB[key].id = id

        if (prodPriceDB[key].id !== null) {
            prodPriceDB[key].value = await getPrice(prodPriceDB[key].id);
        } else {

        }

    }
    console.log('Done gathering production prices!')
}



module.exports = priceUpdater;