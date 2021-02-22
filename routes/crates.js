// Import Dependencies
const express = require('express');
const router = express.Router();
const getPrice = require('../modules/getPrice');
const calcCrate = require('../modules/crateCalc');

// All crates route
router.get('/', (req, res) => {
  res.render('crates/index');
});

router.get('/serendia_old', async (req, res) => {
  try {

    prices = {};

    // Get prices from bdo-api-helper
    prices.bspPrice = await getPrice(4901);
    prices.maplePrice = await getPrice(4602);
    prices.pinePrice = await getPrice(4603);

    // Log prices for testing
    // console.log('bspPrice = ', bspPrice);
    // console.log('maplePrice = ', maplePrice);
    // console.log('pinePrice = ', pinePrice);

    // Render page
    await res.render('crates/serendia_old', {
      var0: prices.bspPrice,
      var1: prices.maplePrice,
      var2: prices.pinePrice
    });
  } catch {

    // Render page with default value if fails
    await res.render('crates/serendia_old', {
      var0: 0,
      var1: 0,
      var2: 0
    });
  }
});

router.get('/serendia', async (req, res) => {

  var data = await calcCrate('Serendia', null);
  await res.render('crates/crate', {
    data: data
  });
});

router.post('/serendia', async (req, res) => {

  var data = await calcCrate('Serendia', req.body);

  //res.send(req.body);
  //console.log(data);
  await res.render('crates/crate', {data: data});
});

// Export router
module.exports = router;