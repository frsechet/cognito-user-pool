"use strict";

const Helpers = require("./helpers");
const AmazonCognitoIdentity = Helpers.AmazonCognitoIdentity;

module.exports = (poolData, body, cb) => {

  const userPool = new Helpers.userPool(poolData);

  const username = body.username;
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

    return cognitoUser.getUserAttributes(function (err, res) {
      if (err) {
        return cb(err);
      }

      return cb(null, res);
    });

  });

};