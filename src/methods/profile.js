const Helpers = require('../helpers');

/**
 * Return the user's profile attributes
 *
 * @param {poolData} poolData
 * @param {{username, refreshToken, accessToken, idToken}} body
 * @param {*} cb
 */
async function profile(poolData, body, cb) {
  try {
    const cognitoUser = await Helpers.getCognitoUser(poolData, body);

    cognitoUser.getUserAttributes((err, res) => cb(err, res));
  }
  catch (err) {
    cb(err);
  }

}

module.exports = profile;
