// Import Dependencies
const express = require('express');
const router = express.Router();
const calcCrate = require('../modules/timberCalc');
const crateList = ['Serendia_Timber_Crate', 'Balenos_Timber_Crate', 'Mediah_Timber_Crate'];
// All crates route
router.get('/', (req, res) => {
  res.render('crates/index');
});

router.get('/timber', async (req, res) => {
  try {
    if (!crateList.includes(req.query.crate)){
      res.removeHeader();
      res.redirect('/crates');
    }
    // Generate Crate Data for initial load
    
    
    var data = await calcCrate(req.query.crate, null);
    //await console.log('THIS IS THE ITEMNAME:', data);

    // Render page
    await res.render('crates/timber', {
      data
    });
  } catch (err) {
    // Redirect to crate if fail
    console.log('get+catch', err)
    res.redirect('/crates');
  }
});

router.post('/timber', async (req, res) => {
  if (!crateList.includes(req.body.crateName)){
    res.redirect('/crates');
  }

  var [itemName, output, basePrice, batchPrice, profit] = await calcCrate(req.body.crateName, req.body);
  await console.log(itemName);
  await res.render('crates/timber', {
    itemName: itemName,
    output: output,
    basePrice: basePrice,
    batchPrice: batchPrice,
    profit: profit
  });

});

// Export router
module.exports = router;