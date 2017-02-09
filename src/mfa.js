"use strict";
let AmazonCognitoIdentity = require("amazon-cognito-identity-js");

module.exports = (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const username = body.username;
  const enableMfa = body.enableMfa;
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
    if (enableMfa === true) {
      return cognitoUser.enableMFA(function(err, res) {
        if (err) {
          return cb(err);
        }
        return cb(null, res);
      });
    }

    else {
      return cognitoUser.disableMFA(function(err, res) {
        if (err) {
          return cb(err);
        }
        return cb(null, res);
      });
    }

  });

};