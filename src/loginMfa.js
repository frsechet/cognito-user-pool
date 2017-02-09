"use strict";
let AmazonCognitoIdentity = require("amazon-cognito-identity-js");

module.exports = (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const username = body.username;
  const mfaCode = body.mfaCode;
  const loginSession = body.loginSession;

  let userData = {
    Username : username,
    Pool : userPool
  };
  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  // update cognitoUser Session with the Session of the MFA request
  cognitoUser.Session = loginSession;

  cognitoUser.sendMFACode(mfaCode, {

    onSuccess: function (result) {
      let data = {
        refreshToken: result.getRefreshToken().getToken(),
        accessToken: result.getAccessToken().getJwtToken(),
        accessTokenExpiresAt: result.getAccessToken().getExpiration(),
        idToken: result.getIdToken().getJwtToken(),
        idTokenExpiresAt: result.getAccessToken().getExpiration()
      };
      return cb(null, data);
    },
    onFailure: function(err) {
      return cb(err);
    }
  });

};