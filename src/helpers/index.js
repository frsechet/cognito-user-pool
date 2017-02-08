"use strict";

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
let CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

module.exports = {
  userPool: function(poolData) {
    return new CognitoUserPool(poolData);
  }
};