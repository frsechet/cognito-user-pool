"use strict";

const Helpers = require("./helpers");
const AmazonCognitoIdentity = Helpers.AmazonCognitoIdentity;

module.exports = (poolData, body, cb) => {

  const userPool = new Helpers.userPool(poolData);

  const username = body.username;
  const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: body.refreshToken});
  const phone_number = body.phone_number;

  const userData = {
    Username : username,
    Pool : userPool
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  // refresh the user session before anything else
  return cognitoUser.refreshSession(refreshToken, function(err, userSession) {
    if (err) {
      return cb(err);
    }
    cognitoUser.signInUserSession = userSession;

    let attributeList = [];

    // the user wants to add or change their phone number (required for MFA)
    if (phone_number) {
      let dataPhoneNumber = {
        Name: "phone_number",
        Value: phone_number
      };
      let attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
      attributeList.push(attributePhoneNumber);
      return cognitoUser.updateAttributes(attributeList, function (err, res) {
        if (err) {
          return cb(err);
        }
        return cb(null, res);

      });
    }

    // if the user wants to delete their phone number
    // it also means that we must disable MFA
    else {
      attributeList.push("phone_number");
      return cognitoUser.disableMFA(function(err) {
        if (err) {
          return cb(err);
        }

        return cognitoUser.deleteAttributes(attributeList, function(err, res) {
          if (err) {
            return cb(err);
          }
          return cb(null, res);
        });
      });

    }

  });

};