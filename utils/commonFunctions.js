// read from properties file
const PropertiesReader = require('properties-reader'); 
const prop = PropertiesReader('url.properties');

const mongoose = require('mongoose');
let Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
let gfs= null;

exports.getProperty = (pty) => {
    return prop.get(pty);
  }

exports.generateResponse = (status,errorCode,errorDesc) => {
    var respObj = {};
    respObj.status = status;
    respObj.errorCode = errorCode;
    respObj.errorDesc = errorDesc;
  
    return respObj;  
  };

exports.createDBConnection = () => {
    const conString = exports.getProperty('mongo_connect_url');
    let connection = mongoose.createConnection(conString,{ useNewUrlParser: true });
    connection.once('open', function () {
        gfs = Grid(connection.db);
    });
};

exports.getGfs = () => {
     return gfs;
}