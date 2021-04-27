// Import Dependencies
const express = require('express');
const router = express.Router();
const calcCrate = require('../modules/crateCalc');
const crateList = ['Balenos_Timber_Crate', 'Calpheon_Timber_Crate', 'Serendia_Timber_Crate', 'Mediah_Timber_Crate'];

// All crates route
router.get('/', (req, res) => {
  res.render('crates/index');
});

router.get('/calc', async (req, res) => {
  try {
    // Make sure valid crate is submitted
    if (!crateList.includes(req.query.crate)){
      res.removeHeader();
      res.redirect('/crates');
    }

    // Generate Crate Data for initial load
    var data = await calcCrate(req.query.crate, null);
    
    // Render page
    await res.render('crates/calc', {data});

  } catch (err) {
    // Redirect to crate if fail
    console.log('GET ERR: ', err)
    res.redirect('/crates');
  }
});

router.post('/calc', async (req, res) => {
  try {
    // Make sure valid crate is submitted
    if (!crateList.includes(req.body.crateName)){
      res.removeHeader();
      res.redirect('/crates');
    }

  // Process data based on information submitted
  var data = await calcCrate(req.body.crateName, req.body);

  // Render page
  await res.render('crates/calc', {data});

  } catch (err) {
    // Redirect to crate if fail
    console.log('POST ERR: ', err)
    res.redirect('/crates');    
  }

});

// Export router
module.exports = router;