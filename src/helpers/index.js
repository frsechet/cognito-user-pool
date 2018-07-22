const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/**
 * Get the current user session using either refreshToken if provided, or idToken and accessToken
 *
 * @param {*} cognitoUser
 * @param {*} { refreshToken, idToken, accessToken }
 * @returns {CognitoUser.signInUserSession}
 */
async function getUserSession(cognitoUser, { refreshToken, idToken, accessToken }) {
  let userSession = null;

  // always use refreshToken if it is provided
  if (refreshToken) {
    const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: refreshToken });

    userSession = await new Promise((resolve, reject) => {
      cognitoUser.refreshSession(RefreshToken, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }

  else {
    const IdToken = new AmazonCognitoIdentity.CognitoIdToken({ IdToken: idToken });
    const AccessToken = new AmazonCognitoIdentity.CognitoAccessToken({ AccessToken: accessToken });

    userSession = new AmazonCognitoIdentity.CognitoUserSession({
      AccessToken,
      IdToken,
    });
  }

  return userSession;
}

/**
 * Get the cognito user object data
 *
 * @param {*} poolData
 * @param {*} { username, idToken, accessToken, refreshToken }
 */
async function getCognitoUser(poolData, { username, idToken, accessToken, refreshToken }) {
  const Pool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({ Username: username, Pool });

  cognitoUser.signInUserSession = await getUserSession(cognitoUser, { refreshToken, idToken, accessToken });
  return cognitoUser;
}

module.exports = {
  getUserSession,
  getCognitoUser,
};
