// Import Dependencies
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const priceUpdater = require('./modules/priceUpdater')

// Import Routers
const indexRouter = require ('./routes/index');
const authorRouter = require('./routes/crates');

// Set web server to use ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// Setup express layouts
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
// Show location of public files like stylesheets + js
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '30kb', extended: false}));

// Setup main router
app.use('/', indexRouter);
// Setup sub routers
app.use('/crates', authorRouter);

app.listen(process.env.PORT || 80);

// Update prices, then update prices every 15 minutes.
priceUpdater();
setInterval(priceUpdater, 900000);