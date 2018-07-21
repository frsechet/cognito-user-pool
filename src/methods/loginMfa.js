const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/**
 * Login 2nd step for users with MFA enabled
 *
 * @param {*} poolData
 * @param {{ username, mfaCode, loginSession }} body
 * @param {*} cb
 */
function loginMfa(poolData, body, cb) {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, mfaCode, loginSession } = body;

  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  // update cognitoUser Session with the Session of the MFA request
  cognitoUser.Session = loginSession;

  cognitoUser.sendMFACode(mfaCode, {

    onSuccess(result) {
      const data = {
        refreshToken: result.getRefreshToken().getToken(),
        accessToken: result.getAccessToken().getJwtToken(),
        accessTokenExpiresAt: result.getAccessToken().getExpiration(),
        idToken: result.getIdToken().getJwtToken(),
        idTokenExpiresAt: result.getAccessToken().getExpiration(),
      };
      cb(null, data);
    },
    onFailure(err) {
      cb(err);
    },
  });

}

module.exports = loginMfa;
