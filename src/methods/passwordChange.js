const Helpers = require('../helpers');

/**
 * Update a user's password
 *
 * @param {poolData} poolData
 * @param {{username, refreshToken, accessToken, idToken}} body
 * @param {*} cb
 */
async function changePassword(poolData, body, cb) {
  try {
    const { oldPassword, newPassword } = body;
    const cognitoUser = await Helpers.getCognitoUser(poolData, body);

    cognitoUser.changePassword(oldPassword, newPassword, (err, res) => cb(err, res));
  }
  catch (err) {
    cb(err);
  }

}

module.exports = changePassword;
