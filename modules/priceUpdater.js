//Import dependencies
var priceDB = require('./priceDB');
const fetch = require('node-fetch');

async function fetchPrices() {
    console.log('Gathering prices...');
    await priceUpdater('na');
    await priceUpdater('eu');
    await priceUpdater('sea');
    await priceUpdater('sa');
    await priceUpdater('mena');
    console.log('Done grathering prices!');
}

async function priceUpdater(region) {
    // arsha.io documentation:  https://documenter.getpostman.com/view/4028519/TzK2bEVg
    // API Categories: https://developers.veliainn.com/

    // Materials
    var materials = await fetch(`https://api.arsha.io/v2/${region}/GetWorldMarketList?mainCategory=25`);
    var parsedMaterials = await materials.json();
    Object.keys(parsedMaterials).forEach(element => {
        Object.keys(priceDB).forEach(element2 => {
            if(priceDB[element2].id == parsedMaterials[element].id) {
                priceDB[element2][region] = parsedMaterials[element].basePrice;
            }
        });
    });

    // Food
    var food = await fetch(`https://api.arsha.io/v2/${region}/GetWorldMarketList?mainCategory=35&subCategory=4`);
    var parsedFood = await food.json();
    Object.keys(parsedFood).forEach(element => {
        Object.keys(priceDB).forEach(element2 => {
            if(priceDB[element2].id == parsedFood[element].id && element2 !== ('Wolf Meat' || 'Milk')) {
                priceDB[element2][region] = parsedFood[element].basePrice;
            }
        });
    });

    // Life Tools
    var tools = await fetch(`https://api.arsha.io/v2/${region}/GetWorldMarketList?mainCategory=40&subCategory=9`);
    var parsedTools = await tools.json();
    Object.keys(parsedTools).forEach(element => {
        Object.keys(priceDB).forEach(element2 => {
            if(priceDB[element2].id == parsedTools[element].id) {
                priceDB[element2][region] = parsedTools[element].basePrice;
            }
        });
    });

    console.log(`Done gathering ${region} prices...`);
    return;
}

module.exports = fetchPrices;

/* Used for mass grabbing item names & ids, then logging to 'message.txt'
const fetch = require('node-fetch');
fs = require('fs');

var doThing = async function doThing() {
    var res = await fetch('https://api.arsha.io/util/db/dump?lang=en')
    var parsedRes = await res.json()

    var mats = await fetch('https://api.arsha.io/v2/na/GetWorldMarketList?mainCategory=25')
    var parsedMats = await mats.json()

    var food = await fetch('https://api.arsha.io/v2/na/GetWorldMarketList?mainCategory=35&subCategory=4')
    var parsedFood = await food.json()

    var tool = await fetch('https://api.arsha.io/v2/na/GetWorldMarketList?mainCategory=40&subCategory=9')
    var parsedTool = await tool.json()

    Object.keys(parsedRes).forEach(element =>{
        //console.log(parsedRes[element].id)
        Object.keys(parsedMats).forEach(element2 => {
            //console.log(parsedMats[element2].id)
            if (parsedMats[element2].id === parsedRes[element].id) {
                fs.appendFileSync('message.txt', `'${parsedRes[element].name}': { id: ${parsedMats[element2].id}, na: 0 },\n`);
            }
        })
        Object.keys(parsedTool).forEach(element2 => {
            if (parsedTool[element2].id === parsedRes[element].id) {
                fs.appendFileSync('message.txt', `'${parsedRes[element].name}': { id: ${parsedTool[element2].id}, na: 0 },\n`);
            }
        })
        Object.keys(parsedFood).forEach(element2 => {
            if (parsedFood[element2].id === parsedRes[element].id) {
                fs.appendFileSync('message.txt', `'${parsedRes[element].name}': { id: ${parsedFood[element2].id}, na: 0 },\n`);
            }
        })

    })
}


doThing()
*/