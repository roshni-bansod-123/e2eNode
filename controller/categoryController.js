const mongoose = require('mongoose');
const Category = require('../model/Category');
const Utils = require('../utils/commonFunctions');

//------------------Creating new category------------------->
exports.createCategory = (req, res) => {
    //Validate  request
    if(!req.body.category){
        return res.status(400).send({
            message: "category cannot be empty"
        });
    }

    //Create and save category in DB
    const category = new Category({
        categoryId: new mongoose.Types.ObjectId,
        category: req.body.category,
        createdDate: new Date,
        categoryImage: req.file.path
      });
      category 
      .save()
      .then(result => res.status(200).json({
        errorCode: Utils.getProperty('success'),
        categoryDetails: category
    }))
      .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating category."
        }); 
    });
}

//------------------Get category details--------------------->
exports.findAllCategories = (req, res) => {
    const category = Category.find()
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category details not found"
            });            
        }
        res.status(200).json({
            errorCode: Utils.getProperty('success'),
            categoryDetails: category
        });
    })
    .catch(err => {
        return res.status(500).send({
            message: "Some error occurred while retrieving category details"
        });
    });
}

//----------------Get category by categoryId------------------->
exports.findCategoryById = (req, res) => {
    const category = Category.findById(req.params.categoryId)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with categoryId " + req.params.categoryId
            });            
        }
        res.status(200).json({
            errorCode: Utils.getProperty('success'),
            categoryDetails: category
        });
    })
    .catch(err => {
        return res.status(500).send({
            message: "Some error occurred while retrieving category with categoryId " + req.params.categoryId
        });
    });
}