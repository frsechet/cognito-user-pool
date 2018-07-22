const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/**
 * Finish forgot password flow
 *
 * @param {*} poolData
 * @param {{ username, passwordResetCode, newPassword }} body
 * @param {*} cb
 */
function resetPassword(poolData, body, cb) {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, passwordResetCode, newPassword } = body;

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmPassword(passwordResetCode, newPassword, {
    onSuccess(res) {
      cb(null, res || 'SUCCESS');
    },
    onFailure(err) {
      cb(err);
    },
  });

}

module.exports = resetPassword;
