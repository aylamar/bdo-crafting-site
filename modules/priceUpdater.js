//Import dependencies
const getPrice = require('./getPrice');
var priceDB = require('./priceDB');


async function priceUpdater() {
    console.log('Gathering Prices...');
    //console.log(await getPrice(priceDB['Maple Timber'].id));

    for (var key in priceDB) {

        //Function information:
        //priceDB[key].value = value/price of item
        //priceDB[key].id = id

        if (priceDB[key].id !== null) {
            priceDB[key].value = await getPrice(priceDB[key].id);
        } else {

        }

    }
    console.log('Done gathering prices!')
}



module.exports = priceUpdater;