const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geo = require('./utils/geocode')
const weather = require('./utils/forecast')

const port = process.env.PORT || 3000


const app = express()
    //this is where the paths are defined
const myPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.use(express.static(myPath))

//Using Handlebars 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('home', {
        title: 'Weather',
        name: 'Andrew Hart'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        one: 'Help option 1',
        two: 'Help option 2',
        three: 'Help option 3',
        name: 'Andrew Hart'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Hart',
        age: '20'
    })
})



app.get('/weather', (req, res) => {
    const address = req.query.address
    if (address.length === 0) {
        return res.send({
            error: 'Please provide a address!'
        })
    }

    geo(address, (error, { latitude, longitude, place } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        const lat = latitude
        const lon = longitude
        const loc = place
        weather(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            return res.send({
                Location: loc,
                Temperature: forecastData.Temperature,
                Feels: forecastData.FeelsLike,
                Type: forecastData.Type,
                WindSpeed: forecastData.Wind,
                WindDirection: forecastData.Direction,
                Time: forecastData.Day,
                pic: forecastData.ImgSrc

            })
        })
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 'About Page',
        errorMessage: 'About article was not found'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page',
        errorMessage: 'Help article was not found'
    })
})



app.get('/weather/*', (req, res) => {
    res.render('404', {
        title: 'Weather Page',
        errorMessage: 'Your searched article was not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Your searched article was not found'
    })
})

app.listen(port, () => {
    console.log('Web server is up and running on port' + port)
})