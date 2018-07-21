const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/**
 * Initiate forgot password flow
 *
 * @param {*} poolData
 * @param {{username}} body
 * @param {*} cb
 */
async function forgotPassword(poolData, body, cb) {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username } = body;

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.forgotPassword({
    onFailure(err) {
      cb(err);
    },
    inputVerificationCode(res) {
      cb(null, res);
    },
  });

}

module.exports = forgotPassword;
