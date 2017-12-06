/* MAPD713 - Enterprise Technologies for Mobile Platforms
 * KID team - 10/29/2017
 * filename...: patient.controller.js
 * description: contains methods for handling all CRUD operations.
 * version....: 0.1
 *
 * Adapted from: https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
 */

var Patient = require( '../models/patient.model.js' );

exports.create = function( req, res ) {
  // Create and save a new patient
  /* if( !req.body.content ) {
    res.status( 400 ).send( { message: "Patient can not be empty." } );
  } */

  var patient = new Patient( {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
    department: req.body.department,
    doctor: req.body.doctor
  } );

  patient.save( function( err, data ) {
    console.log( data );
    if( err ) {
      console.log( err );
      res.status( 500 ).send( { message: "Some error occurred while creating a new patient." } );
    } else {
      res.send( data );
    }
  } );
};

exports.findAll = function( req, res ) {
  // Retrieve and return all patients from the database
  Patient.find( function( err, patients ) {
    if( err ) {
      res.status( 500 ).send( { message: "Some error occurred while retrieving patients." } );
    } else {
      res.send( patients );
    }
  } );
};

exports.findOne = function( req, res ) {
  // Find a single patient with an ID
  Patient.findById( req.params.id, function( err, data ) {
    if( err ) {
      res.status( 500 ).send( { message: "Could not retrieve patient by ID " + req.params.id } );
    } else {
      res.send( data );
    }
  } );
};

exports.update = function( req, res ) {
  // Update a patient identified by the ID in the requests
  Patient.findById( req.params.id, function( err, patient ) {
    if( err ) {
      res.status( 500 ).send( { message: "Could not find a patient by ID " + req.params.id } );
    }

    patient.first_name = req.body.first_name;
    patient.last_name = req.body.last_name;
    patient.address = req.body.address;
    patient.date_of_birth = req.body.date_of_birth;
    patient.department = req.body.department;
    patient.doctor = req.body.doctor;

    patient.save( function( err, data ) {
      if( err ) {
        res.status( 500 ).send( { message: "Could not update patient by ID " + req.params.id } );
      } else {
        res.send( data );
      }
    } );
  } );
};

exports.delete = function( req, res ) {
  // Delete a patient with the specified ID in the requests
  Patient.remove( { _id: req.params.id }, function( err, data) {
    if ( err ) {
      res.status( 500 ).send( { message: "Could not delete patient by ID " + req.params.id } );
    } else {
      res.send( { message: "Patient deleted successfully." } )
    }
  } );
};

exports.deleteAll = function( req, res ) {
  // Delete a patient with the specified ID in the requests
  Patient.remove( {}, function( err, data) {
    if ( err ) {
      res.status( 500 ).send( { message: "Could not delete all patients." } );
    } else {
      res.send( { message: "All patient deleted successfully." } )
    }
  } );
};
