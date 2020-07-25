const path = require ('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
// app.use(express.static(viewsPath))


app.get('', (req, res) => {
    res.render('index', {
        description : 'Weather',
        name: 'Udayan Kamble'
    })
})

app.get('/about', (req, res) => {
    res.render('about' , {
        description : 'About me',
        name: 'Udayan Kamble'
    })
})

app.get('/help', (req, res) => {
    res.render('help' , {
        description : 'Some helpful text..!!',
        name: 'Udayan Kamble'
    })
})

app.get('/weather', (req, res) => {
    // res.send('You are in Ambernath and it is good climate out there.!!')
    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address.'
        })
    }
        geocode(req.query.address,(error, { latitude , longitude , location} = {}) => {
            if (error) {
                return res.send(error)
            }
        
            forecast(latitude, longitude,(error, forecastData) => {
                if (error) {
                    return res.send(error)
                }

                res.send({
                        address: req.query.address,
                        location,
                        forecast: forecastData
                })

                // res.send(location, forecastData)
                // res.send(forecastData)
            })
        })
    // const City = req.query.address
    // res.send({
    //     City,
    //     Current_Temperature : 30,
    //     // Address: req.query.address,
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error : 'You must provide a query term.'
        })
    }
    
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404 page',{
        description: '404',
        name: 'Udayan Kamble',
        errorMessage: 'Help article not found'

    })
})


app.get('*', (req, res) => {
    res.render('404 page',{
        description: '404',
        name: 'Udayan Kamble',
        errorMessage: 'Page not found'

    })
})

app.listen(3001, () =>{
    console.log('The web server is up & running on port 3001')
})