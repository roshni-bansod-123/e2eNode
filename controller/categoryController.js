const mongoose = require('mongoose');
const Category = require('../model/Category');
const Utils = require('../utils/commonFunctions');

//------------------Creating new category------------------->
exports.createCategory = (req, res) => {
    //Validate  request
    if(!req.body.category){
        return res.status(400).send({
            errorDesc: "category cannot be empty"
        });
    }

    //Create and save category in DB
    const cat = Utils.getConnection().model('Category',Category,'categories_collection');
    const category = new cat({
        categoryId: new mongoose.Types.ObjectId,
        category: req.body.category,
        createdDate: new Date,
        categoryImage: req.file.id
    });
    category
        .save()
        .then(result => res.status(200).send(
            Utils.getProperty("success")
        ))
        .catch(err => {
            res.status(500).send({
                errorDesc: err.message || "Some error occurred while creating category."
            });
        });
};

//------------------Get category details--------------------->
exports.findAllCategories = (req, res) => {

    let cat = Utils.getConnection().model('Category',Category,'categories_collection');
    cat.find()
        .then(category => {
            if(!category) {
                return res.status(404).send({
                    errorDesc: "Category details not found"
                });
            }
            res.status(200).json(
                category
            );
        })
        .catch(err => {
            return res.status(500).send({
                errorDesc: "Some error occurred while retrieving category details"
            });
        });
};

//----------------Get category by categoryId------------------->
exports.findCategoryById = (req, res) => {
    Category.findById(req.params.categoryId)
        .then(category => {
            if(!category) {
                return res.status(404).send({
                    errorDesc: "Category not found with categoryId " + req.params.categoryId
                });
            }
            res.status(200).json({
                errorCode: Utils.getProperty('success'),
                categoryDetails: category
            });
        })
        .catch(err => {
            return res.status(500).send({
                errorDesc: "Some error occurred while retrieving category with categoryId " + req.params.categoryId
            });
        });
};

exports.updateCategoryById = (req, res) => {
    let cat = Utils.getConnection().model('Category',Category,'categories_collection');
    cat.findOneAndUpdate({'categoryId':req.body.categoryId},{$set: req.body})
        .then(category => {
            if(!category) {
                return res.status(404).send({
                    errorDesc: "Category not found with categoryId " + req.params.categoryId
                });
            }
            res.status(200).json({
                status: Utils.getProperty('success'),
                errorCode : Utils.getProperty('reg_success_code'),
                errorDesc : Utils.getProperty('success'),
            });
        })
        .catch(err => {
            return res.status(500).send({
                errorDesc: "Some error occurred while retrieving category with categoryId " + req.params.categoryId
            });
        });
};


exports.deleteCategoryById = (req, res) => {
    let cat = Utils.getConnection().model('Category',Category,'categories_collection');
    cat.findOneAndDelete({'categoryId':req.params.categoryId})
        .then(category => {
            if(!category) {
                return res.status(404).send({
                    errorDesc: "Category not found with categoryId " + req.params.categoryId
                });
            }
            res.status(200).json({
                status: Utils.getProperty('success'),
                errorCode : Utils.getProperty('reg_success_code'),
                errorDesc : Utils.getProperty('success'),
            });
        })
        .catch(err => {
            return res.status(500).send({
                errorDesc: "Some error occurred while retrieving category with categoryId " + req.params.categoryId
            });
        });
};