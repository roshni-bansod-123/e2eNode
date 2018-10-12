
let Contactus = require('../model/Contactus.js'); // model class import
let utils = require('../utils/commonFunctions.js');

exports.contactQuery = function(req,res){

    let modelData = utils.getConnection().model('Contact_Us',Contactus);
    let input = new modelData(req.body);
   input.save(function(error){
        if(error){
            console.log(error.errors);
           return res.send(utils.generateResponse(utils.getProperty("failure"), utils.getProperty("invalid_input_code"),utils.getProperty("invalid_input")));
        }else{
            res.send(utils.generateResponse(utils.getProperty("success"), utils.getProperty("reg_success_code"),utils.getProperty("query_saved")));
        }
    });
};

exports.getAllContacts = (req,res) => {
    let modelData = utils.getConnection().model('Contact_Us',Contactus);
    modelData.find({'status' :'Open'},'name message email mobile status',function (err,allContacts) {
        if(err){
            return res.send(utils.generateResponse(utils.getProperty("failure"), utils.getProperty("no_records_found_code"),utils.getProperty("no_records_found")));
        }
        return res.status(200).json(
             allContacts
        )

    })
};

