const mongoose = require('mongoose');
/* url :  <Ip>/<project_name>/user/registration
Type : POST
Headers : Content-Type

Request:
{
  "profileId": "",
  "firstName": "",
  "lastName": "",
  "mobile": "",
  "emailId": ""
}
*/

const user_registration = new mongoose.Schema({
  "profileId": {
    type: String
  },
  "firstName": {
    type: String,
    required: true
  },
  "lastName": {
    type: String,
    required: true
  },
  "mobile": {
    type: Number,
    required: true,
    length: 10
  },
  "emailId": {
    type: String,
    required: true
  },
})
const User_Registration = mongoose.model('User_Registration',user_registration);
module.exports  = User_Registration;
