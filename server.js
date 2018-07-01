const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials/')
app.set('view engine', 'hbs');

//Logger middleware which keep track of web logs
app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(`${now}: ${req.method} ${req.url}`);
    next();
});

//Maintenance middleware ->
//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//});

//Ststic files middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('Hello Express !');
    res.render('home.hbs', {
        pageTitle: 'Home page !!!',
        msg:'Welcome to my website.'
    })
});

app.get('/bad', (req, res) => {
    //res.send('Hello Express !');
    res.send({
        errorMessage: 'Not able o fetch data'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page !!!',
        msg:'We are serving this page'
    });
});

app.listen(3000);
