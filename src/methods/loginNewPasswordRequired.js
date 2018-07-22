const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/**
 * Login user after they set a new password, if a new password is required
 *
 * @param {*} poolData
 * @param {{ username, loginSession, newPassword }} body
 * @param {*} cb
 */
function loginNewPasswordRequired(poolData, body, cb) {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, loginSession, newPassword } = body;

  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  // update cognitoUser Session with the Session of the NEW_PASSWORD_REQUIRED request
  cognitoUser.Session = loginSession;

  cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
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
    mfaRequired() {
      const data = {
        nextStep: 'MFA_AUTH',
        loginSession: cognitoUser.Session,
      };
      cb(null, data);
    },
  });

}
module.exports = loginNewPasswordRequired;
