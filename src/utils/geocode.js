const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidWRheWFua2FtYmxlIiwiYSI6ImNrOTZwaTUwdTB5OXAzaG1zdWw3M24weGIifQ.5AubdoAZxlXdgg7rkj3Hyw&limit=1'

    request( {url, json:true}, (error, { body }={}) => {
        if (error) {
            callback({
                Connection_error: 'Unable to connect to location services..!!'
            }, undefined)

        } else if (body.features.length === 0) {
            callback({
                Location_error: 'Unable to find location. Try another search.'
            }, undefined)

        } else {
            callback(undefined, {
                // console.log('The searched city: '+response.body.features[0].place_name)
                // console.log('This city has Longitude: '+response.body.features[0].center[0]+' & the Lattitude: '+response.body.features[0].center[1])
                
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                
            })
            
        }
    })

}

module.exports = geocode