/* MAPD713 - Enterprise Technologies for Mobile Platforms
 * KID team - 10/29/2017
 * filename...: patient.model.js
 * description: define patient model
 * version....: 0.1
 *
 * Adapted from: https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
 */

 var mongoose = require( 'mongoose' );

 var patientSchema = mongoose.Schema( {
   first_name: String,
   last_name: String,
   address: String,
   date_of_birth: String,
   department: String,
   doctor: String
 } );

 module.exports = mongoose.model( 'Patient', patientSchema );
