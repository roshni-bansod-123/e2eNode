const express = require('express');
const router = express.Router();

const courseController = require('../controller/CourseController');


//------------------ Get all courses ----------------------->
router.get('/courses',courseController.findAllCourses); 

//----------------- Get course by courseId ------------------>
router.get('/course/:courseId',courseController.findCourseById);

module.exports = router;