const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/**
 * Login user
 *
 * @param {*} poolData
 * @param {{username, password}} body
 * @param {*} cb
 */
function login(poolData, body, cb) {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, password } = body;

  const authenticationData = {
    Username: username,
    Password: password,
  };
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess(res) {
      const data = {
        refreshToken: res.getRefreshToken().getToken(),
        accessToken: res.getAccessToken().getJwtToken(),
        accessTokenExpiresAt: res.getAccessToken().getExpiration(),
        idToken: res.getIdToken().getJwtToken(),
        idTokenExpiresAt: res.getAccessToken().getExpiration(),
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
    newPasswordRequired() {
      const data = {
        nextStep: 'NEW_PASSWORD_REQUIRED',
        loginSession: cognitoUser.Session,
      };
      cb(null, data);
    },
  });

}

module.exports = login;
