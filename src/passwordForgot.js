import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export default (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const username = body.username;

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return cognitoUser.forgotPassword({
    onFailure(err) {
      return cb(err);
    },
    inputVerificationCode(res) {
      return cb(null, res);
    },
  });

};