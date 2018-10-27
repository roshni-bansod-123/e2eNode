const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
        rate : Number,
        score : Number,
        total_reviews : Number
},{ _id : false });

const Reviews = reviewSchema
module.exports  = Reviews;