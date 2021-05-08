//Import dependencies
const getPrice = require('./getPrice');
var prodPriceDB = require('./priceDB');


async function priceUpdater() {
    console.log('Gathering Prices...');
    for (var key in prodPriceDB) {

        //Function information:
        //prodPriceDB[key].value = value/price of item
        //prodPriceDB[key].id = id

        // var NeedToGrab = [3701, 3703, 3717, 3719, 3730, 3731, 3732, 3740, 3741, 3742, 4001, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4011, 4052, 4058, 4061, 4064, 4068, 4079, 4082, 4086, 4206, 4263, 4601, 4602, 4603, 4604, 4605, 4606, 4607, 4608, 4609, 4652, 4655, 4658, 4661, 4664, 4667, 4669, 4677, 4681, 4685, 4901]

        if (prodPriceDB[key].search === true) {
            prodPriceDB[key].value = await getPrice(prodPriceDB[key].id);
        } else {

        }

    }
    console.log('Done gathering production prices!')

    // Gather bulk cooking ingredients from api
    /*var cookIngredients = await fetch(`https://bdo-api-helper.herokuapp.com/api/prices/cooking?region=na`);
    var cookIngredParsed = await cookIngredients.json();

    cookIngredParsed.forEach(element => {
        console.log(element.name, element.id, element.price);

        cookPriceDB[element.name].price = element.price;

    });
    console.log('Done gathering cooking ingredient prices!')
    */

    // Gather specifc IDs not in cooking db
    // var NeedToGrab = [9283, null]
    
}



module.exports = priceUpdater;