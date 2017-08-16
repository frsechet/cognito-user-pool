import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export default (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const username = body.username;
  const oldPassword = body.oldPassword;
  const newPassword = body.newPassword;
  const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: body.refreshToken });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return cognitoUser.refreshSession(refreshToken, (err1, userSession) => {
    if (err1) {
      return cb(err1);
    }

    cognitoUser.signInUserSession = userSession;
    return cognitoUser.changePassword(oldPassword, newPassword, (err2, res) => {
      if (err2) {
        return cb(err2);
      }
      return cb(null, res);
    });

  });

};