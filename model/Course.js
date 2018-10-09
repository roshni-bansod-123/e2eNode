const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId : String,
    courseName : String,
    categoryId	: {
       type : String,
       ref : 'categoryId'
    },
    createdDate	: Date,
    updateddate	: Date,
    aboutCourse	: String,
    courseImage	: String,
    courseContent : String,	
    duration : String,
    feautures : {
        instructorLedSessions : String,
        realLifeCaseStudies : String,
        assignments : String,
        certification : String,
        support : String 
    },
    benefits : {
        name : String,
        benefit : [{
            type : String
        }]
    }

});

const Course = mongoose.model('Course',courseSchema,'courses_collection');
module.exports  = Course;