"use strict";

const Helpers = require("./helpers");
const AmazonCognitoIdentity = Helpers.AmazonCognitoIdentity;

module.exports = (poolData, body, cb) => {

  const userPool = new Helpers.userPool(poolData);

  const username = body.username;
  const confirmationCode = body.confirmationCode;

  let userData = {
    Username : username,
    Pool : userPool
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
    if (err) {
      return cb(err);
    }
    return cb(null, Success(result));
  });

};