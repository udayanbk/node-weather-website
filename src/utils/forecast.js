const request = require('request')

const forecast = ( latitude, longitude, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=fb1feff83f7efced00da31762e790919&query=' + latitude + ',' + longitude + '&units=m'

    request( { url, json:true}, (error,{ body }) => {
        if (error) {
            callback('Unable to connect to location services.!!', undefined)

        } else if (body.error) {
            callback ({
                error: 'Unable to find location. Try another search.'
            }, undefined)

        } else {
            callback (undefined, 
                'The weather is like "'+body.current.weather_descriptions[0]+'".'+' It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out. Now it is '+body.current.precip+'% chances of raining.'

                // City:response.body.location.name+', '+response.body.location.region+', '+response.body.location.country+'.',
                // Current_Temperature: response.body.current.temperature,
                // Feels_like_temperature: response.body.current.feelslike,
                // Chance_of_rain: response.body.current.precip+'% chances of raining.'
            )
        }
    })
}

module.exports = forecast