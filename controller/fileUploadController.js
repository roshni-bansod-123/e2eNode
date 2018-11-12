
const utils = require('../utils/commonFunctions');
const mongoose = require('mongoose');
const CourseContent = require('../model/CourseContent');
/*exports.fileUpload = function (req,res) {

    upload(req,res,function(err){
        if(err){
            res.json(
                utils.generateResponse(utils.getProperty('failure'),utils.getProperty('file_error_code'),utils.getProperty('file_error'))
            );
            return;
        }
        res.json(
            utils.generateResponse(utils.getProperty('success'),utils.getProperty('file_saved_code'),utils.getProperty('file_saved'))
        );
    });
};*/

exports.findFileByName =  function(req,res){

    let monId =  mongoose.Types.ObjectId(req.params.filename);
    utils.getGfs().collection(req.params.source);
    utils.getGfs().files.find({"_id": monId}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json(
                utils.generateResponse(utils.getProperty('failure'),utils.getProperty('file_not_found_code'),utils.getProperty('file_not_found'))
            );
        }
        let readstream = utils.getGfs().createReadStream({
            filename: files[0].filename
        });
        res.set('Content-Type', files[0].contentType);
        return readstream.pipe(res);
    });

};

exports.getAllFiles = function(req,res){
    let filesData = [];
    let count = 0;
    utils.getGfs().collection(req.params.source);
    utils.getGfs().files.find({}).toArray((err, files) => {
        // Error checking
        if(!files || files.length === 0){
            return res.status(404).json(
                utils.generateResponse(utils.getProperty('failure'),utils.getProperty('file_not_found_code'),utils.getProperty('file_not_found'))
            );
        }
        // Loop through all the files and fetch the necessary information
        files.forEach((file) => {
            filesData[count++] = {
                fileId: file._id,
                filename: file.filename,
                contentType: file.contentType
            }
        });
        res.json(filesData);
    });
};

exports.fileUpload = function(req,res){
    console.log(req.file.id);
    if(!req.body.source){
        let cat = utils.getConnection().model('CourseContent',CourseContent,'coursecontent_collection');
        let input = new cat({
            courseId : req.body.courseContentId,
            courseContentFile: req.file.id
        });
        input.save(function(error){
            if(error){
                console.log(error.errors);
                return res.send(
                    "Failure"
                );
            }else{
                res.send(
                    "Success"
                );
                return;
            }
        });
    }
    else {

        res.send(
            "Success"
        );
    }

};

exports.removeFile = function (req,res){

    utils.getGfs().collection( req.params.source);
    let monId =  mongoose.Types.ObjectId(req.params.fileId);
    utils.getGfs().collection(req.params.source);
    utils.getGfs().remove({
        "_id": monId,
        root: req.params.source
    }, (err) => {
        if (err){
            res.status(500).send(
                utils.generateResponse(utils.getProperty('failure'),utils.getProperty('file_delete_fail_code'),utils.getProperty('file_delete_fail'))
            );
            return;
        }
        res.send(
            utils.generateResponse(utils.getProperty('success'),utils.getProperty('file_saved_code'),utils.getProperty('file_delete_success'))
        );

    });
};