//////////////////
//
// Define Objects
//
//////////////////


// General object documentation
// update(): update everything
// updateValue(): update the value + publish
// updateBatch(): update the batch value + publish
// updateCount(): update the count + publish 

var userData = {
    crafts: parseInt(document.getElementById("craftCount").value),
    newSelection: function () {
        this.crafts = parseInt(document.getElementById("craftCount").value);
    }
};

var crate = {
    count: parseInt(document.getElementById("crateCount").value),
    value: parseInt(document.getElementById("crateValue").value),
    batch: undefined,
    update: function () {
        this.updateValue();
        this.updateCount();
        this.updateBatchValue();
    },
    updateValue: function () {
        this.value = parseInt(document.getElementById("crateValue").value);
    },
    updateCount: function () {
        this.count = userData.crafts;
        document.getElementById("crateCount").value = this.count;
    },
    updateBatchValue: function () {
        this.batch = this.value * userData.crafts;
        document.getElementById("crateBatch").innerHTML = prep(this.batch);
    }
};

var distance = {
    sel: parseFloat(document.getElementById("distance").value),
    value: undefined,
    batch: undefined,
    update: function () {
        if (isNaN(crate.value)) {
            crate.update();
        }
        this.newSelection();
        this.updateValue();
        this.updateBatch();
    },
    newSelection: function () {
        this.sel = parseFloat(document.getElementById("distance").value);
        document.getElementById("distanceCount").innerHTML = this.sel + "%";
    },
    updateValue: function () {
        this.value = this.sel / 100 * crate.value;
        document.getElementById("distanceValue").innerHTML = prep(this.value);
    },
    updateBatch: function () {
        this.batch = this.value * crate.count;
        document.getElementById("distanceBatch").innerHTML = prep(this.batch);
    }
};

var bargain = {
    sel: parseFloat(document.getElementById("bargain").value),
    bonus: this.sel * 100,
    value: undefined,
    batch: undefined,
    update: function () {
        if (isNaN(distance.value)) {
            distance.update();
        }
        this.newSelection();
        this.updateValue();
        this.updateBatch();
    },
    newSelection: function () {
        this.sel = parseFloat(document.getElementById("bargain").value);
        this.bonus = this.sel * 100;
        document.getElementById("bargainCount").innerHTML = this.bonus + "%";
    },
    updateValue: function () {
        this.value = (crate.value + distance.value) * this.sel;
        document.getElementById("bargainValue").innerHTML = prep(this.value);
    },
    updateBatch: function () {
        this.batch = this.value * userData.crafts;
        document.getElementById("bargainBatch").innerHTML = prep(this.batch);
    },
};

var desert = {
    count: 0.5,
    value: undefined,
    batch: undefined,
    checkbox: document.getElementById("desertStatus"),
    update: function () {
        if (isNaN(bargain.value)) {
            distance.update();
        }
        this.updateCount();
        this.updateValue();
        this.updateBatch();
    },
    updateCount: function() {
        if (this.checkbox.checked == true) {
            this.value = 0.50;
            document.getElementById("desertCount").innerHTML = "50%";
        } else {
            this.value = 0;
            document.getElementById("desertCount").innerHTML = "0%";
        }
    },
    updateValue: function() {
        this.value = (crate.value + distance.value + bargain.value) * this.value;
        document.getElementById("desertValue").innerHTML = prep(this.value);
    },
    updateBatch: function() {
        this.batch = this.value * userData.crafts;
        document.getElementById("desertBatch").innerHTML = prep(this.batch);
    }
};

var profit = {
    cost: 0,
    costBatch: 0,
    totalIncome: 0,
    profit: 0,
    profitBatch: 0,
    update: function() {
        this.updateCost();
        this.updateProfit();
    },
    updateCost: function() {
        this.cost = parseInt(materials.bspCostPer + materials.timber1CostPer + materials.timber2CostPer);
        this.costBatch = parseInt(materials.bspBatch + materials.timber1Batch + materials.timber2Batch);
        document.getElementById("ingredientsCost").innerHTML = prep(this.cost);
        document.getElementById("ingredientsBatch").innerHTML = prep(this.costBatch);
    },
    updateProfit: function() {
        this.profit = parseInt(crate.value + distance.value + bargain.value + desert.value - this.cost);
        this.profitBatch = parseInt(crate.batch + distance.batch + bargain.batch + desert.batch - this.costBatch);
        document.getElementById("profit").innerHTML = prep(this.profit);
        document.getElementById("batchProfit").innerHTML = prep(this.profitBatch);
    }
};

var materials = {
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

    update: function() {
        this.updateVars();
        this.updateCost();
        this.updateCostPer();
        this.updateBatch();
        this.displayData();
    },
    updateVars: function() {
        this.plywood = userData.crafts * 5;
        this.plank = this.plywood * 10 / 2.5;
        this.timber = this.plank * 5 / 2.5;
    },
    updateCost: function() {
        this.bspCost = parseInt(document.getElementById("bspCost").value);
        this.timber1Cost = parseInt(document.getElementById("timberPrice1").value);
        this.timber2Cost = parseInt(document.getElementById("timberPrice2").value);
    },
    updateCostPer: function() {
        this.bspCostPer = this.bspCost;
        this.timber1CostPer = this.timber1Cost * this.timber / userData.crafts;
        this.timber2CostPer = this.timber1Cost * this.timber / userData.crafts;
    },
    updateBatch: function() {
        this.bspBatch = this.bspCost * userData.crafts;
        this.timber1Batch = this.timber1Cost * this.timber;
        this.timber2Batch = this.timber2Cost * this.timber;
    },
    displayData: function() {
        document.getElementById("bspBatch").innerHTML = prep(this.bspBatch);
        document.getElementById("timberBatch1").innerHTML = prep(this.timber1Batch);
        document.getElementById("timberBatch2").innerHTML = prep(this.timber2Batch);
        document.getElementById("timber1").value = this.timber;
        document.getElementById("timber2").value = this.timber;
        document.getElementById("plank1").value = this.plank;
        document.getElementById("plank2").value = this.plank;
        document.getElementById("plywood1").value = this.plywood;
        document.getElementById("plywood2").value = this.plywood;
    }
};

// Truncate + add commas
function prep(val) {
    return numberWithCommas(truncate(val));
}

// Truncate decimal places
function truncate(val) {
    return val.toFixed(0);
}

// Return number with commas as needed
function numberWithCommas(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/////////////////////////
//
// Begin crate calcualtor
//
/////////////////////////

function calculate() {
    userData.newSelection();
    materials.update();
    crate.update();
    distance.update();
    bargain.update();
    desert.update();
    profit.update();
}


// Run everything once to update values
window.onload = function () {
    calculate();
};


// Reminders

// Updating number in number field:
// document.getElementById("myNumberField").value = 42;

// Updating number in span:
// document.getElementById("mySpan").textContent="newtext";
