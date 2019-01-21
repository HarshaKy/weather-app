const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url:`https://api.darksky.net/forecast/8ddcf168b2f164ee9d3fffd5162a0be4/${lat},${lng}`,
    json: true
  } , (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // console.log(body.currently.temperature);
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    } else {
      // console.log('unable to fetch weather');
      callback('unable to fetch weather');
    }
  });
};

module.exports.getWeather = getWeather;
