const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// read from properties file
const PropertiesReader = require('properties-reader'); 
const prop = PropertiesReader('url.properties');

let Category = require('./model/Category');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname))

// -------------- utils ------------------>

getProperty = (pty) => {
  return prop.get(pty);
}
const conString = getProperty('mongo_connect_url');

generateResponse = (status,errorCode,errorDesc) => {
  var respObj = {};
  respObj.status = status;
  respObj.errorCode = errorCode;
  respObj.errorDesc = errorDesc;

  return respObj;

}

mongoose.connect(conString,{ useNewUrlParser: true })
.then(() => console.log('Connected to MongoDb..'))
.catch(err => console.log("Could not connect to MongoDb..", err));

// -------------- filter for cross-origin ------------------>

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// -------------- server port listener ------------------>
app.listen(getProperty('server.port'), () => {
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
        errorCode:getProperty('success'),
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
            errorCode:getProperty('success'),
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
app.get('/category',(req,res) => {
    const category = Category.find()
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category details not found"
            });            
        }
        res.status(200).json({
            errorCode:getProperty('success'),
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
            errorCode:getProperty('success'),
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