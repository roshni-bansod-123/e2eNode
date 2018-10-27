const mongoose = require('mongoose');

const featuresSchema = new mongoose.Schema({
        instructorLedSessions : String,
        realLifeCaseStudies : String,
        assignments : String,
        certification : String
},{ _id : false });

const Feature = featuresSchema
module.exports  = Feature;