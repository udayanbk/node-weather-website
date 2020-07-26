const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=fb1feff83f7efced00da31762e790919&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json:true}, (error,{body}={}) => {
        if (error) {
            callback({
                "connection_error":'Unable to connect to location services.!!'
            }, undefined)

        } else if (body.error) {
            callback ({
                "location_error": 'Unable to find location. Try another search..'
            }, undefined)

        } else {
            callback (undefined, 
                'The weather is like "'+body.current.weather_descriptions[0]+'".'+' It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out. Now it is '+body.current.precip+'% chances of raining.'
            )
        }
    })
}
module.exports = forecast