const request = require('request');
const yargs = require('yargs');

// node app.js --address="1301 lombard street"
// node app.js --address="00000"

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

console.log(argv);

var encodedAddress = encodeURIComponent(argv.address);
console.log('Encoded address: ' + encodedAddress);
// var addr = encodeURIComponent('1301%20lombard%20street%20philadephia');

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
}, (error, response, body) => {
  if(error){
    console.log('Unable to connect to Google server.');
  } else if (body.status === 'ZERO_RESULTS') {
    console.log('Unable to find that address.');
  } else if(body.status === 'OK'){
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  }
});
