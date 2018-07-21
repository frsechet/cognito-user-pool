const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports = (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, passwordResetCode, newPassword } = body;

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return cognitoUser.confirmPassword(passwordResetCode, newPassword, {
    onSuccess(res) {
      return cb(null, res || 'SUCCESS');
    },
    onFailure(err) {
      return cb(err);
    },
  });

};
