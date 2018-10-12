
const utils = require('../utils/commonFunctions');
//const mongoose = require('mongoose');
let multer = require('multer');
//let Grid = require('gridfs-stream');
let GridFsStorage = require('multer-gridfs-storage');
//Grid.mongo = mongoose.mongo;
//const conString = utils.getProperty('mongo_connect_url');
//let connection = mongoose.createConnection(conString,{ useNewUrlParser: true });
//let gfs= utils.getGfs();
/*connection.once('open', function () {
    gfs = Grid(connection.db);
});*/
let storage = GridFsStorage({
    url: utils.getProperty('mongo_connect_url'),
    file: (req, file) => {
        return {
            filename: file.originalname

        }
    }
});

let upload = multer({ //multer settings for single upload
    storage: storage
}).single('file');

exports.fileUpload = function (req,res) {

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
};

exports.findFileByName =  function(req,res){

    utils.getGfs().files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json(
                utils.generateResponse(utils.getProperty('failure'),utils.getProperty('file_not_found_code'),utils.getProperty('file_not_found'))
            );
        }
        /** create read stream */
        let readstream = utils.getGfs().createReadStream({
            filename: files[0].filename
        });
        res.set('Content-Type', files[0].contentType)
        return readstream.pipe(res);
    });
};

exports.getAllFiles = function(req,res){
    let filesData = [];
    let count = 0;

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
                originalname: file.originalname,
                filename: file.filename,
                contentType: file.contentType
            }
        });
        res.json(filesData);
    });
};

exports.checkDuplicate = function(req,res){
    let options = {
        filename: req.headers.filename
    };
    utils.getGfs().exist(options, function (err, found) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(found);
        found ? exports.removeFile(req,res,req.headers.filename) : exports.fileUpload(req,res);
    });
};

exports.removeFile = function (req,res,filename){

    utils.getGfs().remove({ filename: filename }, (err) => {
        if (err){
            res.status(500).send(
                utils.generateResponse(utils.getProperty('failure'),utils.getProperty('file_delete_fail_code'),utils.getProperty('file_delete_fail'))
            );
            return;
        }

        exports.fileUpload(req,res)
    });
};