// Import Dependencies
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require ('./routes/index');

// Set web server to use ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// Setup express layouts
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
// Show location of public files like stylesheets + js
app.use(express.static('public'));

// Setup main router
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);