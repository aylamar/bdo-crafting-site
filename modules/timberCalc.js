const {
    promiseImpl
} = require('ejs');
const getPrice = require('./getPrice');

var crateCalc = async function calc(crateName, body) {
    data = {
        user: {
            crafts: 1,
            processingAvg: 2.5,
            processingProcAvg: 0.05,
            tax: 0.845,
        },

        crate: {
            count: 1,
            value: 1,
            batch: 0,
            batchPretty: ''
        },

        distance: {
            sel: 113.85,
            value: 0,
            batch: 0,
            countPretty: 0,
            valuePretty: 0,
            batchPretty: 0
        },

        bargain: {
            sel: 0.3,
            bonus: 0,
            value: 0,
            batch: 0,
            countPretty: 0,
            valuePretty: 0,
            batchPretty: 0
        },

        desert: {
            count: 0.5,
            value: 0,
            batch: 0,
            countPretty: 0,
            valuePretty: 0,
            batchPretty: 0
        },

        profit: {
            cost: 0,
            costBatch: 0,
            totalIncome: 0,
            profit: 0,
            profitBatch: 0,
            tax: 0,
            taxBatch: 0,
            value: 0,
            valueBatch: 0,
            valuePretty: '',
            valueBatchPretty: '',
            costPretty: '',
            costBatchPretty: '',
            taxPretty: '',
            taxBatchPretty: '',
            profitPretty: '',
            profitBatchPretty: '',
        },

        materials: {
            timber1Name: '',
            timber2Name: '',
            plywood: 0,
            plank: 0,
            timber: 0,
            bsp: 0,
            bspCost: 0,
            plywood1Count: 0,
            plywood1Cost: 0,
            plywood2Cost: 0,
            timber2Cost: 0,
            bspCostPer: 0,
            timber1CostPer: 0,
            timber2CostPer: 0,
            plywood1CostPer: 0,
            plywood2CostPer: 0,
            bspBatch: 0,
            timber1Batch: 0,
            timber2Batch: 0,
            plywood1Batch: 0,
            plywood2Batch: 0,
            bspBatchPretty: '',
            timber1BatchPretty: '',
            timber2BatchPretty: '',
        },
    };

    // Parse values from body
    async function init() {
        if (body != null) {
            data.user.crafts = await body.crafts;
            data.user.processingAvg = await body.processingAvg;
            data.user.processingProcAvg = await body.processingProcAvg;
            data.materials.bspCost = await body.bspCost;
            data.materials.timber1Cost = await body.timber1Cost;
            data.materials.timber2Cost = await body.timber2Cost;
            data.materials.plywood1Cost = await body.plywood1Cost;
            data.materials.plywood2Cost = await body.plywood2Cost;
            data.distance.sel = await body.distance;
            data.bargain.sel = await body.bargain;
            if (await body.desertStatus === 'on') {
                data.desert.count = 0.5;
            } else {
                data.desert.count = 0;
            }
            //data.user.crafts = await body.desertStatus;
        } else {
            await getPrices();
        }
    }

    // Set names based on current sheet
    async function setName() {
        switch (crateName) {
            case 'Balenos':
                data.crate.name = 'Balenos';
                data.crate.value = 28710;
                data.materials.timber1Name = 'Ash';
                data.materials.timber2Name = 'Maple';
                break;
            case 'Mediah':
                data.crate.name = 'Mediah';
                data.crate.value = 40230;
                data.materials.timber1Name = 'Acacia';
                data.materials.timber2Name = 'White Cedar';
                break;
            case 'Serendia':
                data.crate.name = 'Serendia';
                data.crate.value = 32550;
                data.materials.timber1Name = 'Maple';
                data.materials.timber2Name = 'Pine';
                break;
            default:
                data.crate.name = 'Serendia';
                break;
        }
    }

    // Get timber prices
    async function getPrices() {
        var arr = [];
        switch (crateName) {
            case 'Balenos':
                data.crate.name = crateName;
                arr = await Promise.all([getPrice(4601), getPrice(4602), getPrice(4652), getPrice(4655)]);

                data.materials.timber1Cost = await arr[0];
                data.materials.timber2Cost = await arr[1];
                data.materials.plywood1Cost = await arr[2];
                data.materials.plywood2Cost = await arr[3];

                break;
            case 'Mediah':
                data.crate.name = crateName;
                arr = await Promise.all([getPrice(4609), getPrice(4608), getPrice(4681), getPrice(4677)]);

                data.materials.timber1Cost = await arr[0];
                data.materials.timber2Cost = await arr[1];
                data.materials.plywood1Cost = await arr[2];
                data.materials.plywood2Cost = await arr[3];

                break;
            case 'Serendia':
                data.crate.name = crateName;
                arr = await Promise.all([getPrice(4602), getPrice(4603), getPrice(4655), getPrice(4658)]);

                data.materials.timber1Cost = await arr[0];
                data.materials.timber2Cost = await arr[1];
                data.materials.plywood1Cost = await arr[2];
                data.materials.plywood2Cost = await arr[3];

                break;
            default:
                data.crate.name = 'Serendia';
                break;
        }
        // Get BSP Price
        data.materials.bspCost = await getPrice(4901);
    }

    // Calculate materials + costs
    async function calcMaterials() {
        // Update total crafts
        data.materials.plywood = await data.user.crafts * 5;
        data.materials.plank = await data.materials.plywood * 10 / data.user.processingAvg;
        data.materials.timber = await data.materials.plank * 5 / data.user.processingAvg;
        data.materials.bsp = await data.user.crafts;
        data.materials.plywoodCount = await data.materials.timber / 5 * data.user.processingProcAvg;

        // Update batch cost
        data.materials.timber1Batch = await data.materials.timber * data.materials.timber1Cost;
        data.materials.timber2Batch = await data.materials.timber * data.materials.timber2Cost;
        data.materials.bspBatch = await data.materials.bsp * data.materials.bspCost;
        data.materials.plywood1Batch = await data.materials.plywood1Cost * data.materials.plywoodCount;
        data.materials.plywood2Batch = await data.materials.plywood2Cost * data.materials.plywoodCount;

        // Update cost per
        data.materials.timber1CostPer = await data.materials.timber1Batch / data.user.crafts;
        data.materials.timber2CostPer = await data.materials.timber2Batch / data.user.crafts;
        data.materials.bspCostPer = await data.materials.bspBatch / data.user.crafts;
        data.materials.plywood1Per = await data.materials.plywood1Batch / data.user.crafts;
        data.materials.plywood2Per = await data.materials.plywood2Batch / data.user.crafts;

        // Beautify batch
        data.materials.bspBatchPretty = await prep(data.materials.bspBatch);
        data.materials.timber1BatchPretty = await prep(data.materials.timber1Batch);
        data.materials.timber2BatchPretty = await prep(data.materials.timber2Batch);
        data.materials.plywood1BatchPretty = await prep(data.materials.plywood1Batch);
        data.materials.plywood2BatchPretty = await prep(data.materials.plywood2Batch);
    }

    async function calcCrate() {
        data.crate.count = await data.user.crafts;
        data.crate.batch = await data.crate.count * data.crate.value;
        data.crate.batchPretty = await prep(data.crate.batch);
    }

    async function calcDistance() {
        data.distance.value = await data.distance.sel / 100 * data.crate.value;
        data.distance.batch = await data.distance.value * data.crate.count;
        data.distance.countPretty = await data.distance.sel + "%";
        data.distance.valuePretty = await prep(data.distance.value);
        data.distance.batchPretty = await prep(data.distance.batch);
    }

    async function calcBargain() {
        data.bargain.bonus = await data.bargain.sel * 100;
        data.bargain.value = await (data.crate.value + data.distance.value) * data.bargain.sel;
        data.bargain.batch = await data.bargain.value * data.user.crafts;

        data.bargain.countPretty = await data.bargain.bonus + "%";
        data.bargain.valuePretty = await prep(data.bargain.value);
        data.bargain.batchPretty = await prep(data.bargain.batch);
    }

    async function calcDesert() {
        if (await data.desert.count === 0.5) {
            data.desert.value = await (data.crate.value + data.distance.value + data.bargain.value) * data.desert.count;
            data.desert.batch = await (data.desert.value * data.user.crafts);
        } else {
            data.desert.value = await 0;
            data.desert.batch = await 0;
        }
        data.desert.countPretty = await data.desert.count * 100 + "%";
        data.desert.valuePretty = await prep(data.desert.value);
        data.desert.batchPretty = await prep(data.desert.batch);
    }

    async function calcProfit() {
        data.profit.cost = await data.materials.bspCostPer + data.materials.timber1CostPer + data.materials.timber2CostPer;
        data.profit.costBatch = await data.profit.cost * data.user.crafts;

        data.profit.tax = (data.materials.plywood1Per + data.materials.plywood2Per) * (1 - data.user.tax);
        data.profit.taxBatch = data.profit.tax * data.user.crafts;

        data.profit.value = await data.crate.value + data.distance.value + data.bargain.value + data.desert.value;
        data.profit.valueBatch = await data.profit.value * data.user.crafts;

        data.profit.profit = await data.profit.value + data.materials.plywood1Per + data.materials.plywood2Per - data.profit.cost - data.profit.tax;
        data.profit.profitBatch = await data.profit.profit * data.user.crafts;

        // Beautify Text
        data.profit.costPretty = await prep(data.profit.cost);
        data.profit.costBatchPretty = await prep(data.profit.costBatch);
        data.profit.taxPretty = await prep(data.profit.tax);
        data.profit.taxBatchPretty = await prep(data.profit.taxBatch);
        data.profit.valuePretty = await prep(data.profit.value);
        data.profit.valueBatchPretty = await prep(data.profit.valueBatch);
        data.profit.profitPretty = await prep(data.profit.profit);
        data.profit.profitBatchPretty = await prep(data.profit.profitBatch);
    }

    // Execution Order
    await init();
    await setName();
    await calcMaterials();
    await calcMaterials();
    await calcCrate();
    await calcDistance();
    await calcBargain();
    await calcDesert();
    await calcProfit();

    return data;
};


// Truncate + add commas
function prep(val) {
    return addCommas(truncate(val));
}

// Truncate decimal places
function truncate(val) {
    return val.toFixed(0);
}

// Return number with commas as needed
function addCommas(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


module.exports = crateCalc;