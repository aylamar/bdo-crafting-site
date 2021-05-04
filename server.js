// Import Dependencies
const express = require('express');
const app = express();
//const expressLayouts = require('express-ejs-layouts');
const priceUpdater = require('./modules/priceUpdater')

// Import Routers
const indexRouter = require ('./routes/index');
const cratesRouter = require('./routes/crates');
const updatesRouter = require('./routes/updates');

// Set web server to use ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Setup express layouts
// app.set('layout', 'layouts/layout');
// app.use(expressLayouts);

// Show location of public files like stylesheets + js
app.use(express.static('public'));
app.use(express.urlencoded({limit: '30kb', extended: false}));

// Setup main router
app.use('/', indexRouter);
// Setup sub routers
app.use('/crates', cratesRouter);
app.use('/updates', updatesRouter)

app.listen(process.env.PORT || 80);

// Update prices, then update prices every 15 minutes.
setTimeout(priceUpdater, 5000);
setInterval(priceUpdater, 900000);