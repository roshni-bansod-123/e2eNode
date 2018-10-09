const mongoose = require('mongoose');
const Course = require('../model/Course');
const Utils = require('../utils/commonFunctions');


//----------------------Get course details-------------------->
exports.findAllCourses = (req,res) => {
    const course = Course.find()
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course details not found"
            });            
        }
        res.status(200).json({
            errorCode: Utils.getProperty('success'),
            courseDetails: course
        });
    })
    .catch(err => {
        return res.status(500).send({
            message: "Some error occurred while retrieving course details"
        });
    });
}

//----------------------Get course by courseId----------------------------->
exports.findCourseById = (req,res) => {
    const course = Course.findById(req.params.courseId)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course not found with courseId " + req.params.courseId
            });            
        }
        res.status(200).json({
            errorCode: Utils.getProperty('success'),
            courseDetails: course
        });
    })
    .catch(err => {
        return res.status(500).send({
            message: "Some error occurred while retrieving course with courseId " + req.params.courseId
        });
    });
}