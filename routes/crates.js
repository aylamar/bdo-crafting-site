// Import Dependencies
const express = require('express');
const router = express.Router();
const getPrice = require('../modules/getPrice');
const calc = require('../modules/crateCalc');
const defaultCrate = require('../modules/defaultCrate');

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

  console.log(test + 'get + before');
  var test = await defaultCrate('Serendia');
  console.log(test.crate.name + ' get + after');

  await res.render('crates/serendia', {
    data: test
  });
});


// Ignore for Now

router.post('/serendia', async (req, res) => {

  console.log(test + 'post + before');

  var test = calc(0, 'Serendia');

  console.log(test + 'post + after');


  calc(req.body);
  //console.log(test1.userData.crate + ' post');

  //test1.userData.crate = 'test';

  //req.body.processingAverage

  //res.send(req.body);
  await res.render('crates/serendia', {
    var1: 0
  });
});

// Export router
module.exports = router;