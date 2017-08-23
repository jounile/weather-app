const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
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

geocode.geocodeAddress(argv.address);
console.log(argv);
