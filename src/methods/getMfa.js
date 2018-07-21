const Helpers = require('../helpers');

/**
 * Return the user's MFA status
 *
 * @param {poolData} poolData
 * @param {{username, refreshToken, accessToken, idToken}} body
 * @param {*} cb
 */
async function getMFA(poolData, body, cb) {
  try {
    const cognitoUser = await Helpers.getCognitoUser(poolData, body);

    // when MFA is off, res is undefined. We want to cast it as null instead.
    cognitoUser.getMFAOptions((err, res) => cb(err, res || null));
  }
  catch (err) {
    cb(err);
  }

}

module.exports = getMFA;
