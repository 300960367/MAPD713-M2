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
var fs = require('fs');

// parse requests of content-type - application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: true } ) )

// parse requests of content-type - application/json
app.use( bodyParser.json() )

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
app.listen( process.env.PORT || 3000, function() {
//  console.log( "Server is listening on port 3000" );

//app.listen( 'https://mapd713patients.herokuapp.com/patients:443', function() {
//  console.log( "Server is listening on port 443" );
} );
