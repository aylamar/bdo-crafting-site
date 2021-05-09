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
const cookingRouter = require('./routes/cooking');
const updatesRouter = require('./routes/updates');

// Set web server to use ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

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
app.use('/cooking', cookingRouter);
app.use('/updates', updatesRouter)

app.listen(process.env.PORT || 80);

// Update prices, then update prices every 15 minutes.
setTimeout(priceUpdater, process.env.DELAY || 5000);
setInterval(priceUpdater, 900000);

// Test code, pls ignore

/*var test = {"ids": [721003, 10010]};
const request = require('request');
console.log(test)

function doThing() {
    res = request({
        url: 'https://bdo-api-helper.herokuapp.com/api/search?region=na',
        method :"GET",
        headers : {
            "content-type": "application/json",
        },
        body: test
    });
    console.log(res)
}

doThing();
*/

//const fetch = require('node-fetch');

/*
async function doThing() {
    var response = await fetch("https://bdo-api-helper.herokuapp.com/api/prices/fish?region=na");
    var parsedRes = await response.json();

    var i = 0;

    Object.entries(parsedRes).forEach(element => {
        console.log(`'${parsedRes[i].name}': {value: 0, id: ${parsedRes[i].id}, search: false},` )
        i++;
    });

}

doThing();
*/

/*
async function cookIngredients() {
var cookIngredients = await fetch(`https://bdo-api-helper.herokuapp.com/api/prices/cooking?region=na`);
    var cookIngredParsed = await cookIngredients.json();

    var i = 0;

    cookIngredParsed.forEach(element => {
        console.log(`'${cookIngredParsed[i].name}': {value: 0, id: ${cookIngredParsed[i].id}, search: false},`);
        i++;
    });
}

cookIngredients();
*/