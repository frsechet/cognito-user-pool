"use strict";

const Helpers = require("./helpers");
const AmazonCognitoIdentity = Helpers.AmazonCognitoIdentity;

module.exports = (poolData, body, cb) => {

  const userPool = new Helpers.userPool(poolData);

  const username = body.username;
  const password = body.password;

  let authenticationData = {
    Username : username,
    Password : password
  };
  let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  let userData = {
    Username : username,
    Pool : userPool
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (res) {
      let data = {
        refreshToken: res.getRefreshToken().getToken(),
        accessToken: res.getAccessToken().getJwtToken(),
        accessTokenExpiresAt: res.getAccessToken().getExpiration(),
        idToken: res.getIdToken().getJwtToken(),
        idTokenExpiresAt: res.getAccessToken().getExpiration()
      };
      return cb(null, data);
    },
    onFailure: function (err) {
      return cb(err);
    },
    mfaRequired: function() {
      let data = {
        nextStep: "MFA_AUTH",
        loginSession: cognitoUser.Session
      };
      return cb(null, data);
    },
    newPasswordRequired: function () {
      let data = {
        nextStep: "NEW_PASSWORD_REQUIRED",
        loginSession: cognitoUser.Session
      };
      return cb(null, data);
    }
  });

};