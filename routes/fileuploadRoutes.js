const express = require('express');
const router = express.Router();
const utils = require('../utils/commonFunctions');
const fileUploadController = require('../controller/fileUploadController');


//------------------ upload file ----------------------->
router.post('/upload',fileUploadController.checkDuplicate);

//----------------- find file by name ------------------>
router.get('/:filename',fileUploadController.findFileByName);

router.get('/get/allfiles',fileUploadController.getAllFiles);

module.exports = router;