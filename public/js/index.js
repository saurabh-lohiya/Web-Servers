const locationForm = document.querySelector('[data-location-input-form')
console.log('Client Side JS')
locationForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = document.querySelector('[data-location-input]')
  const locationValue = location.value
  const locationDisplay = document.getElementById('locationDisplay')
  const weatherDisplay = document.getElementById('weatherDisplay')

  locationDisplay.innerText = 'Loading...'
  if (!(locationValue === '' || locationValue == null)) {
    fetch(`http://127.0.0.1:3000/weather?address=${locationValue}`).then((response) => {
      response.json().then((data) => {
        locationDisplay.innerText = `${data.location}`
        console.log(data)
        weatherDisplay.innerText = `It's ${data.forecast.temperature} degree C with the windspeed of ${data.forecast.windSpeed} and  ${data.forecast.weather}`
      })
    })
  }
})
