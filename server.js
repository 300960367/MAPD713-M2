/* MAPD713 - Enterprise Technologies for Mobile Platforms
 * Fernando Ito - 10/29/2017
 * filename...: server.js
 * description: main entry-point application
 * version....: 0.1
 *
 * Adapted from: https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
 */

var express = require( 'express' );
var bodyParser = require( 'body-parser' );

// create express app
var app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: true } ) )

// parse requests of content-type - application/json
app.use( bodyParser.json() )

// Configuring fs (file system)
var fs = require('fs');
var key = fs.readFileSync('./encryption/private.key');
var cert = fs.readFileSync('./encryption/primary.crt');
var ca = fs.readFileSync('./encryption/intermediate.crt');
var options = {
  key: key,
  cert: cert,
  ca: ca
};

// Configuring the database
var dbConfig = require( './config/database.config.js' );
var mongoose = require( 'mongoose' );

mongoose.connect( dbConfig.url );

mongoose.connection.on( 'error', function() {
  console.log( 'Could not connect to the database. Exiting now...' );
  process.exit();
} );

mongoose.connection.once( 'open', function() {
  console.log( "Successfully connected to the database." );
} )

// define a simple route
app.get('/', function( req, res ) {
  res.json( { "message": "Patient REST API Application." } );
} );

// Require patient routes
require( './app/routes/patient.routes.js' )( app );

// Require patient record routes
require( './app/routes/record.routes.js' )( app );

// listen for requests
//app.listen( 3000, function() {
  console.log( "Server is listening on port 3000" );
} );

var http = require('http');
http.createServer(app).listen(3000);

app.use(function(req, res, next) {
  if (req.secure) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});
