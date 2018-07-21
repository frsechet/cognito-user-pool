const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/**
 * Resend the signup confirmation code
 *
 * @param {*} poolData
 * @param {{username}} body
 * @param {*} cb
 */
function signupResend(poolData, body, cb) {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username } = body;

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.resendConfirmationCode((err, res) => cb(err, res));

}

module.exports = signupResend;
