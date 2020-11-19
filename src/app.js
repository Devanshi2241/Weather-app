const express= require('express')
const path= require('path')
const hbs= require('hbs')
require('dotenv').config()
const forecast = require('../src/forecast')

const app= express()

const port=  process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Devanshi Harsora'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Devanshi Harsora'
    })
})

app.get('/help',(req,res) => {
    res.render('help' ,{
        title: 'Help',
        helpText: 'This is an Weather app. Here you have to only provide address of which you want to see a weather.',
        name: 'Devanshi Harsora'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
        forecast(req.query.address, ( error,forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                foreCast: forecastData
        })
        })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 'Error 404',
        name: 'Devanshi Harsora',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: 'Error 404',
        name: 'Devanshi Harsora',
        errorMessage: 'Page not found'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' +port)
})


