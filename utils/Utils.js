
const PropertiesReader = require('properties-reader'); // read from properties file
const prop = PropertiesReader('url.properties');


let utils = {};

utils.getProperty = (pty) => {
  return prop.get(pty);
}


utils.generateResponse = (status,errorCode,errorDesc) => {
  let respObj = {};
  respObj.status = status;
  respObj.errorCode = errorCode;
  respObj.errorDesc = errorDesc;

  return respObj;

}


module.exports = utils;
