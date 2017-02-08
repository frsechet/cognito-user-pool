"use strict";

const Helpers = require("./helpers");
const AmazonCognitoIdentity = Helpers.AmazonCognitoIdentity;

module.exports = (poolData, body, cb) => {

  const userPool = new Helpers.userPool(poolData);

  const username = body.username;
  const password = body.password;
  const attributes = body.attributes;

  let attributesList = [];

  if (attributes) {
    attributes.forEach(function (item) {
      let attribute = new AmazonCognitoIdentity.CognitoUserAttribute(item);
      attributesList.push(attribute);
    });
  }

  userPool.signUp(username, password, attributesList, null, function(err, res){
    if (err) {
      console.log(err);
      return cb(err);
    }
    let cognitoUser = res.user;
    let data = {
      username: cognitoUser.getUsername()
    }
    return cb(null, data);

  });

};