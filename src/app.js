const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hemant'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hemant'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'This is the help section',
        name: 'Hemant'
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    const address = req.query.address;
    geocode(address, (error, { latitude, longitude, location }={}) => {
        if (error) {
          return res.send({
              error,
          });
        }
        weather(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
                error,
            });
          }
          res.send({
            forecastData,
            address,
            location,
        });
        });
      });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.rating);
    res.send({
        product: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        statusCode: 404,
        description: 'Help Article not Found',
        name: 'Hemant'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        statusCode: 404,
        description: 'Page not Found',
        name: 'Hemant'
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}!`);
});