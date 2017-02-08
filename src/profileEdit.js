"use strict";

const Helpers = require("./helpers");
const AmazonCognitoIdentity = Helpers.AmazonCognitoIdentity;

module.exports = (poolData, body, cb) => {

  const userPool = new Helpers.userPool(poolData);

  const attributes = body.attributes;
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

    let attributeUpdateList = [];
    let attributeDeleteList = [];

    if (attributes) {
      attributes.forEach(function (item) {

        // if the attribute concerns the phone number
        if (item.Name === "phone_number") {
          // do nothing, rather use profileEditPhoneNumber
          // as there are some additionals checks concerning MFA to perform
        }

        // if the attribute has a set value, update it with the new value
        else if (item.Value !== null) {
          let attribute = new AmazonCognitoIdentity.CognitoUserAttribute(item);
          attributeList.push(attribute);
        }

        // otherwise, delete the attribute for that user
        else {
          attributeDeleteList.push(item.Name);
        }
      })
    }

    // first, update the new params
    return cognitoUser.updateAttributes(attributeUpdateList, function (err) {
      if (err) {
        return cb(err);
      }

      // now, delete the params that need to be deleted
      return cognitoUser.deleteAttributes(attributeDeleteList, function (err, res) {
        if (err) {
          return cb(err);
        }
        return cb(null, res);
      });

    });

  });

};