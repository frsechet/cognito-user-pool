"use strict";
let AmazonCognitoIdentity = require("amazon-cognito-identity-js");

module.exports = (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const username = body.username;
  const oldPassword = body.oldPassword;
  const newPassword = body.newPassword;
  const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: body.refreshToken});

  const userData = {
    Username : username,
    Pool : userPool
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return cognitoUser.refreshSession(refreshToken, function(err, userSession) {
    if (err) {
      return cb(err);
    }

    cognitoUser.signInUserSession = userSession;
    return cognitoUser.changePassword(oldPassword, newPassword, function(err, res) {
      if (err) {
        return cb(err);
      }
      return cb(null, res);
    });

  });

};