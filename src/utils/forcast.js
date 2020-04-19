const request = require('request')

const forcast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/e4f1580b1e97ace2a31411300ecfad5f/' + lat + ',' + long

request({ url, json: true}, (error, body) => {
        if (error) {
            callback("Unable to connect to Weather Service", undefined)
        } else if (body.error) {
            callback('Unable To Find Location', undefined)
        } else {
            callback(undefined, 
                // temp: response.body.currently.temperature,
                // rainProb: response.body.currently.precipProbability
                body.daily.data[0].summary + ' It is Currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '%' + ' chance of rain.'
            )
        }
    })
}

module.exports = forcast