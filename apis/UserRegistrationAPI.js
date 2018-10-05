
let User_Registration = require('../model/user_registration.js'); // model class import
const uuid = require('uuid/v4'); // generate UUID
let utils = require('../utils/Utils.js');

let user_registration_api = {};

user_registration_api.dupCheck = function(req,res){
  User_Registration.find({
    $or:[{
      'mobile': req.body.mobile
    },{
      'emailId': req.body.emailId
    }]
  },function (err,results) {
    console.log(results.length);
    if(results.length == 0){
      user_registration_api.registerData(req,res);
    }else{
      res.send(utils.generateResponse(utils.getProperty("failure"),"", utils.getProperty("user_exists")));
      console.log(results);
    }

  });
}

user_registration_api.registerData = function(req,res){
  let input = new User_Registration(req.body);
  input.profileId = uuid();
  input.save(function(error){
    if(error){
      console.log(error.errors);
      res.send(utils.generateResponse(utils.getProperty("failure"), utils.getProperty("invalid_input_code"),utils.getProperty("invalid_input")));
    }else{
      res.send(utils.generateResponse(utils.getProperty("success"), utils.getProperty("reg_success_code"),utils.getProperty("user_registered")));
    }
  })

}

module.exports = user_registration_api;
