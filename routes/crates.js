// Import Dependencies
const express = require('express');
const router = express.Router();
const getPrice = require('../modules/getPrice');

// All crates route
router.get('/', (req, res) => {
  res.render('crates/index');
});

async function imBadAtAstnc() {
  try {
    const test = await getPrice(4602);
    console.log(test);
  } catch {}
}

router.get('/serendia', async (req, res) => {
  imBadAtAstnc();
  /*  try {
    const test = await getPrice(4602);
    await console.log(test);
    await getPrice(4602);

    await console.log('test');
    await console.log(test);

  } catch {

  } */
  res.render('crates/serendia');
});

// Export router
module.exports = router;