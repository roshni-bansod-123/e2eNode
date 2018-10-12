
let Contactus = require('../model/Contactus.js'); // model class import
let utils = require('../utils/commonFunctions.js');

exports.contactQuery = function(req,res){

    let modelData = utils.getConnection().model('Contact_Us',Contactus);
    let input = new modelData(req.body);
   input.save(function(error){
        if(error){
            console.log(error.errors);
            res.send(utils.generateResponse(utils.getProperty("failure"), utils.getProperty("invalid_input_code"),utils.getProperty("invalid_input")));
        }else{
            res.send(utils.generateResponse(utils.getProperty("success"), utils.getProperty("reg_success_code"),utils.getProperty("query_saved")));
        }
    });
};

