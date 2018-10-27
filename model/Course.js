const mongoose = require('mongoose');
const Feature = require('./Features');
const Benefits = require('./Benefits');
const Reviews = require('./Reviews');
const courseSchema = new mongoose.Schema({
    courseId : String,
    courseName : String,
    type	    : Array,
    createdDate	: {
        type: Date,
        default: Date.now()
    },
    updatedDate	: Date,
    aboutCourse	: String,
    courseImage	: String,
    courseContent : String,	
    duration : String,
    features : Feature,
    benefits : Benefits,
    reviews: Reviews

});

//const Course = mongoose.model('Course',courseSchema,'courses_collection');
const Course = courseSchema
module.exports  = Course;