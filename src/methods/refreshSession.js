const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports = (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username } = body;
  const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: body.refreshToken });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return cognitoUser.refreshSession(refreshToken, (err, res) => {

    if (err) {
      return cb(err);
    }

    const data = {
      refreshToken: res.getRefreshToken().getToken(),
      accessToken: res.getAccessToken().getJwtToken(),
      accessTokenExpiresAt: res.getAccessToken().getExpiration(),
      idToken: res.getIdToken().getJwtToken(),
      idTokenExpiresAt: res.getAccessToken().getExpiration(),
    };
    return cb(null, data);
  });

};
