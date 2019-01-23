const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}%20+&key=AIzaSyCCop2EWpUwz1II7ocvEh1jiAuXs2II5zo`;

axios.get(geocodeUrl).then((response) => {
  console.log(response.data);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('unable to connect to api servers');
  }
});

// 8ddcf168b2f164ee9d3fffd5162a0be4
// // example lat and lng
// "latitude": 42.3601,
// "longitude": -71.0589,
