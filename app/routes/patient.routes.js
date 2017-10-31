/* MAPD713 - Enterprise Technologies for Mobile Platforms
 * KID team - 10/29/2017
 * filename...: patient.routes.js
 * description: define patient end points
 * version....: 0.1
 *
 * Adapted from: https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
 */

 module.exports = function( app ) {

/*******
 Patient
 *******/

   var patients = require( '../controllers/patient.controller.js' );

   // Create a new patient
   app.post( '/patients', patients.create );

   // Retrieve all patients
   app.get( '/patients', patients.findAll );

   // Retrieve a single patient by ID
   app.get( '/patients/:id', patients.findOne );

   // Update a patient by ID
   app.put( '/patients/:id', patients.update );

   // Delete a patient by ID
   app.delete( '/patients/:id', patients.delete );

 }
