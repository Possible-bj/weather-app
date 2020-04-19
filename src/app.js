const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

// console.log(__dirname)
// console.log(__filename)

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
        res.render('index', {
            title: 'Weather App',
            name: 'Possible'
    })
})

app.get('/about', (req, res) => {
        res.render('about', {
            title: 'About Me',
            name: 'Possible'
    })
})

app.get('/help', (req, res) => {
        res.render('help', {
            title: 'Help',
            message: 'Welcome to the help page',
            name: 'Possible'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 
    
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({error})
            }
        forcast(lat, long, (error, forcastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        }) 
        })



        // forcast: 'It is snowing',
        // location: 'Lagos',
        // address: req.query.address, 410603
})

app.get('/products', (req, res) => {
if (!req.query.search) {
    return res.send({
        error: 'You must provide a search term'
    })
}
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not Found',
        name: 'Possible'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page Not Found',
        name: 'Possible'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})