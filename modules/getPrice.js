var exports = module.exports;

const fetch = require('node-fetch');

async function getPrice(id) {
    try {
    var response = await fetch(`https://bdo-api-helper.herokuapp.com/marketplace-clone/item-info/${id}?region=na`);
    var parsedRes = await response.json();

    return await parsedRes.detailList[0].pricePerOne;
    } catch {
        return 0;
    }
}

module.exports = getPrice;