const request = require('request');

const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Addr to fetch weather',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        // console.log(JSON.stringify(weatherResults, undefined, 2));
        console.log(`it's currently ${weatherResults.temperature}. it feels like ${weatherResults.apparentTemperature}`);
      }
    });
  }
});




// 8ddcf168b2f164ee9d3fffd5162a0be4
// // example lat and lng
// "latitude": 42.3601,
// "longitude": -71.0589,
