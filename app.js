const request = require('request');
const yargs = require('yargs');

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

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}%20+&key=AIzaSyCYJznXeBwok_h5AZ1QuvvMrtrkmcl1_yE`,
  json: true
}, (error, response, body) => {
  // console.log(body);

  if (error) {
    console.log('unable to connect to google servers');
  }

    else if (body.status == 'ZERO_RESULTS') {
    console.log('Unable to find location for that address');
  }

    else if (body.status == 'OVER_QUERY_LIMIT') {
    console.log('You have exceeded your daily request quota for this API. If you did not set a custom daily request quota, verify your project has an active billing account: http://g.co/dev/maps-no-account');
  }

    else if (body.status == 'OK') {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  }
});
