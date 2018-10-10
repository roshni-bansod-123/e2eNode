const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let app = express();
const Utils = require('./utils/commonFunctions');

// -------------- filter for cross-origin ------------------>
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));


// --------------- defining routes ------------------------->
const CourseRoutes = require('./routes/courseRoutes');
app.use('/courseroute',CourseRoutes);

const CategoryRoutes = require('./routes/categoryRoutes');
app.use('/categoryroutes',CategoryRoutes);

const ContactusRoutes = require('./routes/contactusRoutes');
app.use('/contactusroutes',ContactusRoutes);

// ----------------- mongoDb connection -------------------->
const conString = Utils.getProperty('mongo_connect_url');
mongoose.connect(conString,{ useNewUrlParser: true })
.then(() => console.log('Connected to MongoDb..'))
.catch(err => console.log("Could not connect to MongoDb..", err));


// -------------- server port listener ------------------>
app.listen(Utils.getProperty('server.port'), () => {
  console.log("Well done, now I am listening...")
});


