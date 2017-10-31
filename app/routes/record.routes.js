/* MAPD713 - Enterprise Technologies for Mobile Platforms
 * KID team - 10/30/2017
 * filename...: record.routes.js
 * description: define patient record end points
 * version....: 0.1
 *
 * Adapted from: https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
 */

 module.exports = function( app ) {

/*****************
 * Patient records
 *****************/

   var records = require( '../controllers/record.controller.js' );

   // Create a new patient record
   app.post( '/patients/:id/records', records.create );

   // Retrieve all patient records
   app.get( '/patients/:id/records', records.findAll );

   // Retrieve a single patient record by ID
   app.get( '/patients/:id/records/:recordId', records.findOne );

   // Update a patient record by ID
   app.put( '/patients/:id/records/:recordId', records.update );

   // Delete a patient record by ID
   app.delete( '/patients/:id/records/:recordId', records.delete );

 }
