const postmanRequest = require('postman-request')

const weatherInfo = (address, callBack) => {
  const url = `http://api.weatherstack.com/current?access_key=6360efc28404a6cedc8e6f636cc7c7b1&query=${address.latitude},${address.longitude}`

  postmanRequest({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log(error)
    } else if (response.body.error) {
      console.log('Unable to find location')
    } else {
      callBack(undefined, {
        temperature: response.body.current.temperature,
        weather: response.body.current.weather_descriptions,
        windSpeed: response.body.current.wind_speed

      })
    }
  })
}

module.exports = weatherInfo
