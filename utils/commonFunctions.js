// read from properties file
const PropertiesReader = require('properties-reader'); 
const prop = PropertiesReader('url.properties');

exports.getProperty = (pty) => {
    return prop.get(pty);
  }

exports.generateResponse = (status,errorCode,errorDesc) => {
    var respObj = {};
    respObj.status = status;
    respObj.errorCode = errorCode;
    respObj.errorDesc = errorDesc;
  
    return respObj;  
  }