import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export default (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const username = body.username;
  const enableMfa = body.enableMfa;
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
    if (enableMfa === true) {
      return cognitoUser.enableMFA((err2, res) => {
        if (err2) {
          return cb(err2);
        }
        return cb(null, res);
      });
    }


    return cognitoUser.disableMFA((err3, res) => {
      if (err3) {
        return cb(err3);
      }
      return cb(null, res);
    });


  });

};