const getPrice = require('../modules/getPrice');

var defaultCrate = async function calc(crateName) {
    data = {
        userData: {
            crafts: 1,
        },

        crate: {
            count: 1,
            value: 1,
            batch: 0
        },

        distance: {
            sel: 0,
            value: 0,
            batch: 0
        },

        bargain: {
            sel: 0,
            bonus: this.sel * 100,
            value: 0,
            batch: 0,
        },

        desert: {
            count: 0.5,
            value: 0,
            batch: 0,
        },

        profit: {
            cost: 0,
            costBatch: 0,
            totalIncome: 0,
            profit: 0,
            profitBatch: 0,
        },

        materials: {
            plywood: 0,
            plank: 0,
            timber: 0,
            bsp: 0,
            bspCost: 0,
            timber1Cost: 0,
            timber2Cost: 0,
            bspCostPer: 0,
            timber1CostPer: 0,
            timber2CostPer: 0,
            bspBatch: 0,
            timber1Batch: 0,
            timber2Batch: 0,
        },
    };

    // Get Timber Prices + Set Name
    async function grabPrices() {
        switch (crateName) {
            case 'Serendia':
                data.crate.name = crateName;
                data.crate.value = 32550;
                data.materials.timber1Cost = await getPrice(4602);
                console.log(data.materials.timber1Cost);
                data.materials.timber2Cost = await getPrice(4603);
                break;
            default:
                data.crate.name = 'Serendia';
                break;
        }
        // Get BSP Price
        data.materials.bspCost = await getPrice(4901);
    }

    // Execution Order
    await grabPrices();

    return data;
};

module.exports = defaultCrate;