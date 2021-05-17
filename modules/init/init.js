const { listGenerator } = require('./listGenerator');
const { regionGenerator } = require('./regionGenerator');

var init = async function init() {
    listGenerator();
    regionGenerator();
};

module.exports = { init };