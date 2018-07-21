const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/**
 * Refresh a user's session (retrieve refreshed tokens)
 *
 * @param {*} poolData
 * @param {{username, refreshToken}} body
 * @param {*} cb
 */
async function refreshSession(poolData, body, cb) {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username } = body;
  const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: body.refreshToken });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.refreshSession(refreshToken, (err, res) => {
    if (err) cb(err);

    const data = {
      refreshToken: res.getRefreshToken().getToken(),
      accessToken: res.getAccessToken().getJwtToken(),
      accessTokenExpiresAt: res.getAccessToken().getExpiration(),
      idToken: res.getIdToken().getJwtToken(),
      idTokenExpiresAt: res.getAccessToken().getExpiration(),
    };
    cb(null, data);
  });

}

module.exports = refreshSession;
