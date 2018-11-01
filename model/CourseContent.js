const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
    courseId : String,
    courseContentFile: String
});

const CourseContent = courseContentSchema;
module.exports  = CourseContent;
