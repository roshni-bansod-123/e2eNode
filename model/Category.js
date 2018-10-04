const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    category : String,
    createdDate : Date,
    updatedDate : Date
});

const Category = mongoose.model('Category',categorySchema,'categories_collection');
module.exports  = Category;
