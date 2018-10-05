
let Contact_Us = require('../model/contact_us.js'); // model class import
let utils = require('../utils/Utils.js');

let contact_us_api = {};

contact_us_api.contactQuery = function(req,res){

  let input = new Contact_Us(req.body);
  input.save(function(error){
    if(error){
      console.log(error.errors);
      res.send(utils.generateResponse(utils.getProperty("failure"), utils.getProperty("invalid_input_code"),utils.getProperty("invalid_input")));
    }else{
      res.send(utils.generateResponse(utils.getProperty("success"), utils.getProperty("reg_success_code"),utils.getProperty("query_saved")));
    }
  })
}

module.exports = contact_us_api;
