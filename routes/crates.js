// Import Dependencies
const express = require('express');
const router = express.Router();
const calcCrate = require('../modules/timberCalc');
const crateList = ['Serendia', 'Balenos', 'Mediah'];
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
    // Generate Crate Data
    var data = await calcCrate(req.query.crate, null);
    
    // Render page
    await res.render('crates/timber', {
      data: data
    });
  } catch {
    // Redirect to crate if fail
    res.redirect('/crates');
  }
});

router.post('/timber', async (req, res) => {
  if (!crateList.includes(req.body.crateName)){
    res.redirect('/crates');
  }

  var data = await calcCrate(req.body.crateName, req.body);
  await res.render('crates/timber', {
    data: data
  });

  // test functions
  //res.send(req.body);
  //console.log(data);
});

// Export router
module.exports = router;