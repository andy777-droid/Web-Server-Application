const request = require('request')


const getweather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8adbc8503147da84eed6982e9dc10b15&query=' + long + ',' + lat
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Could not connect to server', undefined)
        } else if (body.error) {
            callback('Location unknown. Please try again!', undefined)
        } else {
            callback(undefined, {
                Temperature: body.current.temperature,
                FeelsLike: body.current.feelslike,
                Type: body.current.weather_descriptions[0],
                Wind: body.current.wind_speed,
                Direction: body.current.wind_dir,
                Day: body.current.is_day,
                ImgSrc: body.current.weather_icons[0]

            })
        }
    })
}


module.exports = getweather