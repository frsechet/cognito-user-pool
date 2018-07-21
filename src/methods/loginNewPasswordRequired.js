const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports = (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, loginSession, newPassword } = body;

  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  // update cognitoUser Session with the Session of the NEW_PASSWORD_REQUIRED request
  cognitoUser.Session = loginSession;

  return cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
    onSuccess(result) {
      const data = {
        refreshToken: result.getRefreshToken().getToken(),
        accessToken: result.getAccessToken().getJwtToken(),
        accessTokenExpiresAt: result.getAccessToken().getExpiration(),
        idToken: result.getIdToken().getJwtToken(),
        idTokenExpiresAt: result.getAccessToken().getExpiration(),
      };
      return cb(null, data);
    },
    onFailure(err) {
      return cb(err);
    },
    mfaRequired() {
      const data = {
        nextStep: 'MFA_AUTH',
        loginSession: cognitoUser.Session,
      };
      return cb(null, data);
    },
  });

};
