const getPrice = require('../modules/getPrice');

// Import data 
var calc = function calc(test, crateName) {
    data = {
        crafts: 1,
        processingAvg: 2.5,
        processingProc: 0.05,
        bargain: 0.38,
        desertStatus: 'on'
    };
    
    crate = {
        count: userData.crafts,
        name: ''
    };

    userData.name = crateName;
    
    return crate, userData;
};


module.exports = calc;