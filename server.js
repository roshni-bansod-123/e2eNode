const express = require('express');
const mongoose = require('mongoose');

let app = express();

const Utils = require('./utils/commonFunctions');

// --------------- defining routes ------------------------->
const CourseRoutes = require('./routes/courseRoutes');
app.use('/courseroute',CourseRoutes);

const CategoryRoutes = require('./routes/categoryRoutes');
app.use('/categoryroutes',CategoryRoutes);

// ----------------- mongoDb connection -------------------->
const conString = Utils.getProperty('mongo_connect_url');
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
app.listen(Utils.getProperty('server.port'), () => {
  console.log("Well done, now I am listening...")
})


