const request = require('request')

const geoaddress = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1IjoiYW5keWdvb2YiLCJhIjoiY2s5b3FkN2g5MDMycjNncXA2Y21mdXRkdCJ9.qYEvC39AAe_16ieH8cibHQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to server', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find requested location. Please try again', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                place: body.features[0].place_name
            })

        }
    })


}


module.exports = geoaddress