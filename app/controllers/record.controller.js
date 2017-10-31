/* MAPD713 - Enterprise Technologies for Mobile Platforms
 * KID team - 10/30/2017
 * filename...: record.controller.js
 * description: contains methods for handling all CRUD operations of patient records.
 * version....: 0.1
 *
 * Adapted from: https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
 */

var Record = require( '../models/record.model.js' );

exports.create = function( req, res ) {

  var record = new Record( {
    patient_id: req.params.id,
    date: req.body.date,
    nurse_name: req.body.nurse_name,
    type: req.body.type,
    category: req.body.category,
    diastolic: req.body.diastolic,
    systolic: req.body.systolic
  } );

  record.save( function( err, data ) {
    console.log( data );
    if( err ) {
      console.log( err );
      res.status( 500 ).send( { message: "Some error occurred while creating a new record." } );
    } else {
      res.send( data );
    }
  } );
};

exports.findAll = function( req, res ) {
  // Retrieve and return all records of the specified patient from the database
  Record.find( { patient_id: req.params.id }, function( err, records ) {
  if( err ) {
    res.status( 500 ).send( { message: "Some error occurred while retrieving all records." } );
  } else {
    res.send( records );
  }
  } );
};

exports.findOne = function( req, res ) {
  // Find a single record by ID
  Record.findById( req.params.recordId, function( err, data ) {
    if( err ) {
      res.status( 500 ).send( { message: "Could not retrieve record by ID " + req.params.recordId } );
    } else {
      res.send( data );
    }
  } );
};

exports.update = function( req, res ) {
  // Update a record identified by the ID in the requests
  Record.findById( req.params.recordId, function( err, record ) {
    if( err ) {
      res.status( 500 ).send( { message: "Could not find a record by ID " + req.params.recordId } );
    }

    record.patient_id = req.params.id;
    record.date = req.body.date;
    record.nurse_name = req.body.nurse_name;
    record.type = req.body.type;
    record.category = req.body.category;
    record.diastolic = req.body.diastolic;
    record.systolic = req.body.systolic;

    record.save( function( err, data ) {
      if( err ) {
        res.status( 500 ).send( { message: "Could not update record by ID " + req.params.recordId } );
      } else {
        res.send( data );
      }
    } );
  } );
};

exports.delete = function( req, res ) {
  // Delete a record with the specified ID in the requests
  Record.remove( { _id: req.params.recordId }, function( err, data) {
    if ( err ) {
      res.status( 500 ).send( { message: "Could not delete record by ID " + req.params.recordId } );
    } else {
      res.send( { message: "Record deleted successfully." } )
    }
  } );
};
