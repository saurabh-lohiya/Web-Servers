const postmanRequest = require('postman-request')

const geoCode = (address, callBack) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZXJyMHItNDA0IiwiYSI6ImNrZjB6NmRnczA1NXUzMnFkNHR3aDhjeTYifQ.4fXviUj63ALdeeDokfWTWA'

  postmanRequest({ url, json: true }, (error, { body }) => {
    if (error) {
      console.log(error)
    } else if (body.features.length === 0) {
      console.log('Unable to find the location')
    } else {
      callBack(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geoCode
