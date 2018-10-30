const express = require('express');
const router = express.Router();
const utils = require('../utils/commonFunctions');
const fileUploadController = require('../controller/fileUploadController');

let GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

const storage = GridFsStorage({
    url: utils.getProperty('mongo_connect_url'),
    cache: true,
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: 'banners'

        }
    }
});

const fileFilter = (req,file,cb) => {

    let options = {
        filename:file.originalname
    };

    utils.getGfs().exist(options, function (err, found) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(found);
        found ? removeFile(file.originalname,cb) : cb(null,true);
    });
};

const removeFile = function(filename,cb) {
    utils.getGfs().remove({ filename: filename }, (err) => {
        if (err){
            res.status(500).send(
                utils.generateResponse(utils.getProperty('failure'),utils.getProperty('file_delete_fail_code'),utils.getProperty('file_delete_fail'))
            );
            return;
        }
        cb(null,true);
    });
};

const upload = multer({storage: storage,fileFilter: fileFilter});

//------------------ upload file ----------------------->
router.post('/upload',upload.single('file'),fileUploadController.fileUpload);

//----------------- find file by name ------------------>
router.get('/:filename/:source',fileUploadController.findFileByName);

router.get('/get/allfiles/:source',fileUploadController.getAllFiles);

module.exports = router;