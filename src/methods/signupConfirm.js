const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/**
 * Confirm the signup action
 *
 * @param {*} poolData
 * @param {{username, confirmationCode}} body
 * @param {*} cb
 */
function signupConfirm(poolData, body, cb) {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, confirmationCode } = body;

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmRegistration(confirmationCode, true, (err, res) => cb(err, res));

}

module.exports = signupConfirm;
