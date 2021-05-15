//Import dependencies
const getPrice = require('./getPrice');
var priceDB = require('./priceDB');
const fetch = require('node-fetch');

async function priceUpdater() {
    console.log('Gathering bulk prices...');
    // Gather bulk cooking prices
    var cookPrices = await fetch(`https://bdo-api-helper.herokuapp.com/api/prices/cooking?region=na`);
    var cookParsed = await cookPrices.json();
    var i = 0;

    cookParsed.forEach(element => {
        if (cookParsed[i].id !== null) {
            switch(cookParsed[i].name){
                case 'Wolf Meat':
                    break;
                case 'Milk':
                    break;
                default:
                    priceDB[cookParsed[i].name].value = cookParsed[i].price;
        }}
        i++
    });

    console.log('Done gathering cooking ingredient prices!');

    var fishPrices = await fetch(`https://bdo-api-helper.herokuapp.com/api/prices/fish?region=na`);
    var fishParsed = await fishPrices.json();
    var i = 0;

    fishParsed.forEach(element => {
        if (fishParsed[i].id !== null) {
            priceDB[fishParsed[i].name].value = fishParsed[i].price;
        }
        i++
    });

    console.log('Done gathering fish prices!');
    console.log('Gathering non-bulk prices...');

    // Gather non-bulk prices

    for (var key in priceDB) {

        //Function information:
        //priceDB[key].value = value/price of item
        //priceDB[key].id = id

        if (priceDB[key].search === true) {
            priceDB[key].value = await getPrice(priceDB[key].id);
        }
    }
    console.log('Done gathering non-bulk prices!');
}

module.exports = priceUpdater;

/* Used for generating new item list
async function cookIngredients() {
var cookIngredients = await fetch(`https://bdo-api-helper.herokuapp.com/api/prices/cooking?region=na`);
    var cookIngredParsed = await cookIngredients.json();

    var i = 0;

    cookIngredParsed.forEach(element => {
        console.log(`'${cookIngredParsed[i].name}': {value: 0, id: ${cookIngredParsed[i].id}, search: false},`);
        i++;
    });
}
*/