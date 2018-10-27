const mongoose = require('mongoose');

const benefitSchema = new mongoose.Schema({
        reason : String,
        benefit1 : String,
        benefit2 : String,
        benefit3 : String,

},{ _id : false });

//const Course = mongoose.model('Course',courseSchema,'courses_collection');
const Benefits = benefitSchema;
module.exports  = Benefits;