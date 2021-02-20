// Import Dependencies
const express = require('express');
const router = express.Router();
const getPrice = require('../modules/getPrice');

// All crates route
router.get('/', (req, res) => {
  res.render('crates/index');
});

/* Working Async Function
 async function imBadAtAstnc() {
  try {
    const test = await getPrice(4602);
    console.log(test);
  } catch {}
}*/

router.get('/serendia', async (req, res) => {
  try {

    // Get prices from bdo-api-helper
    const bspPrice = await getPrice(4901);
    const maplePrice = await getPrice(4602);
    const pinePrice = await getPrice(4603);

    // Log prices for testing
    console.log('bspPrice = ', bspPrice);
    console.log('maplePrice = ', maplePrice);
    console.log('pinePrice = ', pinePrice);

    // Render page
    await res.render('crates/serendia', { var0: bspPrice, var1: maplePrice, var2: pinePrice });
  } catch {

    // Render page with default value if fails
    await res.render('crates/serendia', { var0: 0, var1: 0, var2: 0 });
  }
});

// Export router
module.exports = router;