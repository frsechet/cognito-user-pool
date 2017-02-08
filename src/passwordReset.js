"use strict";

const Helpers = require("./helpers");
const AmazonCognitoIdentity = Helpers.AmazonCognitoIdentity;

module.exports = (poolData, body, cb) => {

  const userPool = new Helpers.userPool(poolData);

  const username = body.username;
  const passwordResetCode = body.passwordResetCode;
  const newPassword = body.newPassword;

  const userData = {
    Username : username,
    Pool : userPool
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return cognitoUser.confirmPassword(passwordResetCode, newPassword, {
    onSuccess: function (res) {
      return cb(null, res || "SUCCESS");
    },
    onFailure: function(err) {
      return cb(err);
    }
  });

};