//Import dependencies
const getPrice = require('./getPrice');
var prodPriceDB = require('./prodPriceDB');


async function priceUpdater() {
    console.log('Gathering Prices...');
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

    // Gather
    /*var cookIngredients = await fetch(`https://bdo-api-helper.herokuapp.com/api/prices/cooking?region=na`);
    var cookIngredParsed = await cookIngredients.json();

    cookIngredParsed.forEach(element => {
        console.log(element.name, element.id, element.price);

        cookPriceDB[element.name].price = element.price;

    });
    console.log('Done gathering cooking ingredient prices!')
    */
    
}



module.exports = priceUpdater;