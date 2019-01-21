const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}%20+&key=AIzaSyBaG9M9TZ2B9edD3nPW4_UXofg3xI0jLgk`,
    json: true
  }, (error, response, body) => {
    // console.log(body);

    if (error) {
      callback('unable to connect to google servers');
      // console.log('unable to connect to google servers');
    }

      else if (body.status == 'ZERO_RESULTS') {
        callback('Unable to find location for that address');
        // console.log('Unable to find location for that address');
    }

      else if (body.status == 'OVER_QUERY_LIMIT') {
        callback('You have exceeded your daily request quota for this API.')
        // console.log('You have exceeded your daily request quota for this API.');
    }

      else if (body.status == 'REQUEST_DENIED') {
        callback('API key invalid/missing.')
    }

      else if (body.status == 'OK') {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
        // console.log(`Address: ${body.results[0].formatted_address}`);
        // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
        // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
