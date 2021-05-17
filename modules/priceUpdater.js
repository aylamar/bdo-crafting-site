//Import dependencies
var priceDB = require('./priceDB');
const fetch = require('node-fetch');

async function fetchPrices() {
    console.log('Gathering prices...')
    await priceUpdater('na');
    await priceUpdater('eu');
    await priceUpdater('sea');
    await priceUpdater('sa');
    await priceUpdater('mena');
    console.log('Done grathering prices!')
}

async function priceUpdater(region) {
    // arsha.io documentation:  https://documenter.getpostman.com/view/4028519/TzK2bEVg
    // API Categories: https://developers.veliainn.com/

    // Materials
    var materials = await fetch(`https://api.arsha.io/v2/${region}/GetWorldMarketList?mainCategory=25`)
    var parsedMaterials = await materials.json()
    Object.keys(parsedMaterials).forEach(element => {
        Object.keys(priceDB).forEach(element2 => {
            if(priceDB[element2].id == parsedMaterials[element].id) {
                priceDB[element2][region] = parsedMaterials[element].basePrice;
            }
        })
    })

    // Food
    var food = await fetch(`https://api.arsha.io/v2/${region}/GetWorldMarketList?mainCategory=35&subCategory=4
    `)
    var parsedFood = await food.json()
    Object.keys(parsedFood).forEach(element => {
        Object.keys(priceDB).forEach(element2 => {
            if(priceDB[element2].id == parsedFood[element].id && element2 !== ('Wolf Meat' || 'Milk')) {
                priceDB[element2][region] = parsedFood[element].basePrice;
            }
        })
    })

    // Life Tools
    var tools = await fetch(`https://api.arsha.io/v2/${region}/GetWorldMarketList?mainCategory=40&subCategory=9
    `)
    var parsedTools = await tools.json()
    Object.keys(parsedTools).forEach(element => {
        Object.keys(priceDB).forEach(element2 => {
            if(priceDB[element2].id == parsedTools[element].id) {
                priceDB[element2][region] = parsedTools[element].basePrice;
            }
        })
    })

    console.log(`Done gathering ${region} prices...`);
    return;
}

module.exports = fetchPrices;