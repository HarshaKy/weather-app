const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}%20+&key=AIzaSyA4NsTdd0kWIyMkXJ7UCrjZD6M27JmkYwM`,
      json: true
    }, (error, response, body) => {
      // console.log(body);

      if (error) {
        reject('unable to connect to google servers');
        // console.log('unable to connect to google servers');
      }

        else if (body.status == 'ZERO_RESULTS') {
          reject('Unable to find location for that address');
          // console.log('Unable to find location for that address');
      }

        else if (body.status == 'OVER_QUERY_LIMIT') {
          reject('You have exceeded your daily request quota for this API.')
          // console.log('You have exceeded your daily request quota for this API.');
      }

        else if (body.status == 'REQUEST_DENIED') {
          reject('API key invalid/missing.')
      }

        else if (body.status == 'OK') {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
          // console.log(`Address: ${body.results[0].formatted_address}`);
          // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
          // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
      }
    });
  });
};

geocodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
})
