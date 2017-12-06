/* MAPD713 - Enterprise Technologies for Mobile Platforms
 * KID team - 10/30/2017
 * filename...: record.model.js
 * description: define patient record model
 * version....: 0.1
 *
 * Adapted from: https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
 */

 var mongoose = require( 'mongoose' );

 var recordSchema = mongoose.Schema( {
   patient_id: String,
   date: String,
   nurse_name: String,
   type: String,
   category: String,
   readings: {
     diastolic: String,
     systolic: String,
   }
/*   }, {
     timestamps: true
*/
 } );

 module.exports = mongoose.model( 'Record', recordSchema );
