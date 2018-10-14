const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId : mongoose.Schema.Types.ObjectId,
    category : String,
    createdDate : Date,
    updatedDate : Date,
    categoryImage : String

});

//const Category = mongoose.model('Category',categorySchema,'categories_collection');
const Category = categorySchema;
module.exports  = Category;
