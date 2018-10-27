const express = require('express');
const router = express.Router();
const multer = require('multer');
const utils = require('../utils/commonFunctions');
let GridFsStorage = require('multer-gridfs-storage');
const courseController = require('../controller/CourseController');

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};
const storage = GridFsStorage({
    url: utils.getProperty('mongo_connect_url'),
    cache: true,
    file: (req, file) => {
        return {
            filename: file.originalname

        }
    }
});
const upload = multer({storage: storage,fileFilter: fileFilter});

//------------------ Get all courses ----------------------->
router.get('/courses',courseController.findAllCourses); 

//----------------- Get course by courseId ------------------>
router.get('/course/:courseId',courseController.findCourseById);

router.post('/course/addCourse',upload.single('courseImage'),courseController.checkCourseState);

module.exports = router;