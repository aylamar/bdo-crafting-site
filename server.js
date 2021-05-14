// Import Dependencies
const express = require('express');
const app = express();
const priceUpdater = require('./modules/priceUpdater')
var path = require('path')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Import Routers
const indexRouter = require('./routes/index');
const productionRouter = require('./routes/production');
const craftingRouter = require('./routes/crafting');
const cookingRouter = require('./routes/cooking');
const updatesRouter = require('./routes/updates');

// Set web server to use ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Show location of public files like stylesheets + js
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    limit: '30kb',
    extended: false
}));

// Setup main router
app.use('/', indexRouter);
// Setup sub routers
app.use('/production', productionRouter);
app.use('/crafting', craftingRouter);
app.use('/cooking', cookingRouter);
app.use('/updates', updatesRouter)

app.listen(process.env.PORT || 80);

// Update prices, then update prices every 15 minutes.
setTimeout(priceUpdater, process.env.DELAY || 100);
setInterval(priceUpdater, 900000);

const { listGenerator } = require('./modules/init/listGenerator');

listGenerator()