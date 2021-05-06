// Import Dependencies
const express = require('express');
const app = express();
const priceUpdater = require('./modules/priceUpdater')

// Import Routers
const indexRouter = require('./routes/index');
const productionRouter = require('./routes/production');
const updatesRouter = require('./routes/updates');

// Set web server to use ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Show location of public files like stylesheets + js
app.use(express.static('public'));
app.use(express.urlencoded({
    limit: '30kb',
    extended: false
}));

// Setup main router
app.use('/', indexRouter);
// Setup sub routers
app.use('/production', productionRouter);
app.use('/updates', updatesRouter)

app.listen(process.env.PORT || 80);

// Update prices, then update prices every 15 minutes.
setTimeout(priceUpdater, 500000);
setInterval(priceUpdater, 900000);