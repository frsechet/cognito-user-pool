const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports = (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, enableMfa } = body;
  const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: body.refreshToken });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return cognitoUser.refreshSession(refreshToken, (err, userSession) => {
    if (err) {
      return cb(err);
    }

    cognitoUser.signInUserSession = userSession;
    if (enableMfa === true) {
      return cognitoUser.enableMFA((err2, res) => cb(err2, res));
    }

    return cognitoUser.disableMFA((err2, res) => cb(err2, res));

  });

};
