const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let utils = require('./utils/Utils.js');
const conString = utils.getProperty('mongo_connect_url');
let user_registration_api = require('./apis/UserRegistrationAPI.js');
let contact_us_api = require('./apis/ContactUsAPI.js')



// read from properties file
const PropertiesReader = require('properties-reader'); 
const prop = PropertiesReader('url.properties');

let Category = require('./model/Category');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname))


mongoose.connect(conString,{ useNewUrlParser: true })
.then(() => console.log('Connected to MongoDb..'))
.catch(err => console.log("Could not connect to MongoDb..", err));

// -------------- filter for cross-origin ------------------>

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// -------------- server port listener ------------------>
app.listen(utils.getProperty('server.port'), () => {
  console.log("Well done, now I am listening...")
})

// ------------ post category ---------------------->
app.post('/create/category',(req,res,next) => {

    //Validate  request
    if(!req.body.category){
        return res.status(400).send({
            message: "category cannot be empty"
        });
    }

    //Create and save category in DB
    const category = new Category({
        _id: new mongoose.Types.ObjectId,
        category: req.body.category,
        createdDate: new Date
      });
      category 
      .save()
      .then(result => res.status(200).json({
        errorCode:utils.getProperty('success'),
        categoryDetails: category
    }))
      .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating category."
        }); 
    });
});

//-------------get category by _id----------------------->
app.get('/category/:_id',(req,res) => {
    const category = Category.findById(req.params._id)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params._id
            });            
        }
        res.status(200).json({
            errorCode:utils.getProperty('success'),
            categoryDetails: category
        })
    })
    .catch(err => {
        return res.status(500).send({
            message: "Some error occurred while retrieving category with id " + req.params._id
        });
    })
});

//------------------get list of categories------------------->
app.get('/categories',(req,res) => {
    const category = Category.find()
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category details not found"
            });            
        }
        res.status(200).json({
            errorCode:utils.getProperty('success'),
            categoryDetails: category
        })
    })
    .catch(err => {
        return res.status(500).send({
            message: "Some error occurred while retrieving category details"
        });
    })
});

//--------------------update category--------------------------->
app.put('/update/category/:_id',(req,res) => {
    const category = Category.findByIdAndUpdate(req.params._id)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category details not found"
            });            
        }
        res.status(200).json({
            errorCode:utils.getProperty('success'),
            categoryDetails: category
        })
    })
    .catch(err => {
        return res.status(500).send({
            message: "Some error occurred while updating category detail"
        });
    })
});

//-------------------delete category-------------------------------->
app.delete('delete/category/:_id',(req,res) => {
    Category.findByIdAndDelete(req.params._id)
    .then( res.send("Category deleted successfully") )
    .catch(err => {
        return res.status(500).send({
            message: "Some error occurred while deleting category detail"
        });
    })
});


// -------------- post user registration ------------------>

app.post(utils.getProperty('user_registration_url'),function(req,res){
    if(!req.body){
        return res.status(400).send({
            message: "Data cannot be empty"
        });
    }
    user_registration_api.dupCheck(req,res);
})

// -------------- put contact registration ------------------>

app.put(utils.getProperty('contact_us_url'),function(req,res){
    if(!req.body){
        return res.status(400).send({
            message: "Data cannot be empty"
        });
    }
    contact_us_api.contactQuery(req,res);
})


// -------------- ping service ------------------>
app.get('/',function(req,res){
    res.send("Hello");
})