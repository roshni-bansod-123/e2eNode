const mongoose = require('mongoose');
/* url :  <Ip>/<project_name>/user/registration
Type : PUT
Headers : Content-Type

Request:
{
  "name": "",
  "message": "",
  "mobile": "",
  "emailId": ""
}
*/

const contact_us = new mongoose.Schema({
  "name": {
    type: String,
    required: true
  },
  "message": {
    type: String,
    maxlength: 255
  },
  "mobile": {
    type: String,
    required: true,
    maxlength: 10
  },
  "email": {
    type: String,
    required: true
  },
  "createdDate": {
    type: Date,
    default: Date.now()
  },
  "status": {
    type: String,
    default: 'Open'
  }
})
const Contact_Us = mongoose.model('Contact_Us',contact_us);
module.exports  = Contact_Us;
