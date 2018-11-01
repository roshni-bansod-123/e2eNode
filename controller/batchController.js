const Batches = require('../model/Batches');
const utils = require('../utils/commonFunctions');

exports.addBatch = (req,res) => {
    let modelData = utils.getConnection().model('Batches',Batches,'batches_collection');
    if(req.body._id === null){
        let input = new modelData(req.body);
        console.log(input);

        input.save(function(error){
            if(error){
                console.log(error.errors);
                return res.send(
                    utils.generateResponse(utils.getProperty("failure"), utils.getProperty("invalid_input_code"),utils.getProperty("invalid_input"))
                );
            }else{
                res.send(
                    utils.generateResponse(utils.getProperty("success"), utils.getProperty("reg_success_code"),utils.getProperty("query_saved"))
                );
            }
        });
    }else {
        modelData.findByIdAndUpdate(req.body._id,{$set: req.body})   .then(batch => {
            if(!batch) {
                return res.status(404).send(
                    utils.generateResponse(utils.getProperty("failure"), utils.getProperty("invalid_input_code"),utils.getProperty("invalid_input"))
                );
            }
            res.status(200).send(
                utils.generateResponse(utils.getProperty("success"), utils.getProperty("reg_success_code"),utils.getProperty("query_saved"))
            );
        })
            .catch(err => {
                console.log(err);
                return res.status(500).send(
                    utils.generateResponse(utils.getProperty("failure"), utils.getProperty("invalid_input_code"),utils.getProperty("invalid_input"))
                );
            });
    }
};

exports.getBatches = (req,res) => {
    let modelData = utils.getConnection().model('Batches',Batches,'batches_collection');
    modelData.find({}, function(err,batches){
        if(err){
            return res.send(utils.generateResponse(utils.getProperty("failure"), utils.getProperty("no_records_found_code"),utils.getProperty("no_records_found")));
        }
        return res.status(200).json(
            batches
        )

    })
};

exports.deleteBatches = (req,res) => {
    let modelData = utils.getConnection().model('Batches',Batches,'batches_collection');
    modelData.findByIdAndDelete(req.params.id)   .then(batch => {
        if(!batch) {
            return res.status(404).send(
                utils.generateResponse(utils.getProperty("failure"), utils.getProperty("invalid_input_code"),utils.getProperty("invalid_input"))
            );
        }
        res.status(200).send(
            utils.generateResponse(utils.getProperty("success"), utils.getProperty("reg_success_code"),utils.getProperty("query_saved"))
        );
    })
        .catch(err => {
            console.log(err);
            return res.status(500).send(
                utils.generateResponse(utils.getProperty("failure"), utils.getProperty("invalid_input_code"),utils.getProperty("invalid_input"))
            );
        });
};