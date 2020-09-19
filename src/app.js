const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const weatherInfo = require('./utils/weatherStack')

const app = express()
const port = process.env.PORT || 3000

const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pubDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    place: `${req.query.address}`,
    name: 'Saurabh Lohiya'

  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      title: 'Weather',
      address: `${req.query.address}`,
      name: 'Saurabh Lohiya'
    })
  }
  geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    weatherInfo({ latitude, longitude }, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      return res.send({
        location,
        forecast: forecastData
      })
    })
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    name: 'Lionel Messi',
    title: 'Help',
    helpText: 'Support desk'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About ME!',
    name: 'Cristiano Ronaldo'
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Must provide a search query'
    })
  }
  return res.send('', {
    products: []
  })
})

app.get('*', (req, res) => {
  res.send('404 Page Not Found')
})

app.listen(port, () => {
  console.log('Server is Running')
})
