const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    selectedCourse : String,
    startDate : Date,
    duration : Number,
    courseTime : String,
    courseId : String,
    faculty : String
});

const Batches = batchSchema;
module.exports  = Batches;