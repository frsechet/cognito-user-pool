import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export default (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const username = body.username;
  const passwordResetCode = body.passwordResetCode;
  const newPassword = body.newPassword;

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