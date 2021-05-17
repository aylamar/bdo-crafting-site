// Import Dependencies
const express = require('express');
const app = express();
const fetchPrices = require('./modules/priceUpdater');
const { init } = require('./modules/init/init');

var path = require('path');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Import Routers
const indexRouter = require('./routes/index');
const productionRouter = require('./routes/production');
const processingRouter = require('./routes/processing');
const cookingRouter = require('./routes/cooking');
const updatesRouter = require('./routes/updates');

// Set web server to use ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

let options = {
    dotfiles: 'ignore',
    etag: true,
    index: false,
    maxAge: "7d"
};

// Set location of public files & set cache
// app.use(express.static(path.join(__dirname, 'public')));
const oneDay = 1 * 24 * 60 * 60 * 1000;
const oneWeek = 7 * 24 * 60 * 60  * 1000;
function static(dirname, age) {
    
    return express.static(path.join(__dirname, dirname), { maxAge: age });
}
app.use('/assets', static('public/assets', oneWeek));
app.use('/css', static('public/css', oneDay));
app.use('/js', static('public/js', oneDay));
app.use(express.urlencoded({
    limit: '30kb',
    extended: false
}));

// Setup main router
app.use('/', indexRouter);
// Setup sub routers
app.use('/production', productionRouter);
app.use('/processing', processingRouter);
app.use('/cooking', cookingRouter);
app.use('/updates', updatesRouter);

app.listen(process.env.PORT || 80);

// Initialize Data
init();

// Update prices after 1 second, then update prices every 15 minutes.
setTimeout(fetchPrices, process.env.DELAY || 1000);
setInterval(fetchPrices, 900000);