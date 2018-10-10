
let Contactus = require('../model/Contactus.js'); // model class import
let utils = require('../utils/commonFunctions.js');

let contact_us_api = {};

exports.contactQuery = function(req,res){

    console.log(req.body);
    let input = new Contactus(req.body);
    input.save(function(error){
        if(error){
            console.log(error.errors);
            res.send(utils.generateResponse(utils.getProperty("failure"), utils.getProperty("invalid_input_code"),utils.getProperty("invalid_input")));
        }else{
            res.send(utils.generateResponse(utils.getProperty("success"), utils.getProperty("reg_success_code"),utils.getProperty("query_saved")));
        }
    })
}

//module.exports = contact_us_api;
