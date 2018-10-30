const mongoose = require('mongoose');
const Course = require('../model/Course');
const Utils = require('../utils/commonFunctions');


//----------------------Get course details-------------------->
exports.findAllCourses = (req,res) => {
    const course = Utils.getConnection().model('Course',Course,'courses_collection');
    course .find()
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course details not found"
            });
        }
        res.status(200).json(
           course
        );
    })
    .catch(err => {
        return res.status(500).send({
            message: "Some error occurred while retrieving course details"
        });
    });
};

//----------------------Get course by courseId----------------------------->
exports.findCourseById = (req,res) => {
    const course = Utils.getConnection().model('Course',Course,'courses_collection');
    course.findById(req.params.courseId)
        .then(course => {
            if(!course) {
                return res.status(404).send({
                    message: "Course not found with courseId " + req.params.courseId
                });
            }
            res.status(200).json({
                course
            });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Some error occurred while retrieving course with courseId " + req.params.courseId
            });
        });
};

exports.checkCourseState = (req,res) => {
    const course = Utils.getConnection().model('Course',Course,'courses_collection');
    let courseId = req.body.courseId;
    if(courseId === null || courseId === 'undefined' || courseId === ''){
        exports.addCourse (req,res);
    }else{
        let data = JSON.parse(req.body.courseData);

        if(req.file.id != null){
            data.courseImage = req.file.id;
        }
        course.findByIdAndUpdate(courseId,{$set:data})
            .then(course => {
                if(!course) {
                    return res.status(404).send(
                       "Course not found with courseId " + courseId
                    );
                }
                res.status(200).send(
                    "Updated Successfully"
                );
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send(
                     "Some error occurred while retrieving course with courseId " + courseId
                );
            });
        }


};


//----------------------Add Course----------------------------->
exports.addCourse = (req,res) => {
    const course = Utils.getConnection().model('Course',Course,'courses_collection');
    let input = new course(JSON.parse(req.body.courseData));
    if(req.file.id != null){
        input.courseImage = req.file.id;
    }
    input.save(function(error){
        if(error){
            console.log(error.errors);
            return res.send(
                Utils.generateResponse(Utils.getProperty("failure"), Utils.getProperty("add_course_failed_code"),Utils.getProperty("add_course_failed"))
            );
        }else{
            res.status(200).send(
                Utils.getProperty("success")
            );
        }
    });
};




//----------------------Delete Course----------------------------->
exports.deleteCourse = (req,res) => {
    const course = Utils.getConnection().model('Course',Course,'courses_collection');
    course.findByIdAndDelete(req.params.courseId)
        .then(course => {
            if(!course) {
                return res.status(404).send(
                    Utils.generateResponse(Utils.getProperty("failure"), Utils.getProperty("delete_course_failed_code"),Utils.getProperty("delete_course_failed"))

                );
            }
            res.status(200).send(
                Utils.generateResponse(Utils.getProperty("success"), Utils.getProperty("delete_course_success_code"),Utils.getProperty("delete_course_success"))
            );
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send(
                Utils.generateResponse(Utils.getProperty("failure"), Utils.getProperty("delete_course_failed_code"),Utils.getProperty("delete_course_failed"))
            );
        });
};

