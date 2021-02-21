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

var crafts = {
    crafts: parseInt(document.getElementById("craftCount").value),
    newSelection: function () {
        this.crafts = parseInt(document.getElementById("craftCount").value);
        console.log(this.crafts);
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
        this.count = crafts.crafts;
        document.getElementById("crateCount").value = this.count;
    },
    updateBatchValue: function () {
        this.batch = this.value * crafts.crafts;
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
        this.batch = this.value * crafts.crafts;
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
        this.batch = this.value * crafts.crafts;
        document.getElementById("desertBatch").innerHTML = prep(this.batch);
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
    crafts.newSelection();
    crate.update();
    distance.update();
    bargain.update();
    desert.update();
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
