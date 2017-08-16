import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export default (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const username = body.username;
  const password = body.password;

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

  return cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess(res) {
      const data = {
        refreshToken: res.getRefreshToken().getToken(),
        accessToken: res.getAccessToken().getJwtToken(),
        accessTokenExpiresAt: res.getAccessToken().getExpiration(),
        idToken: res.getIdToken().getJwtToken(),
        idTokenExpiresAt: res.getAccessToken().getExpiration(),
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
    newPasswordRequired() {
      const data = {
        nextStep: 'NEW_PASSWORD_REQUIRED',
        loginSession: cognitoUser.Session,
      };
      return cb(null, data);
    },
  });

};