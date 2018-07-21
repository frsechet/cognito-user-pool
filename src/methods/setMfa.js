const Helpers = require('../helpers');

/**
 * Return the user's MFA status (must have a phone_number set)
 *
 * @param {poolData} poolData
 * @param {{username, refreshToken, accessToken, idToken}} body
 * @param {*} cb
 */
async function setMfa(poolData, body, cb) {
  try {
    const { enableMfa = false } = body;
    const cognitoUser = await Helpers.getCognitoUser(poolData, body);

    if (enableMfa === true) {
      cognitoUser.enableMFA((err, res) => cb(err, res));
    }
    else {
      cognitoUser.disableMFA((err, res) => cb(err, res));
    }
  }
  catch (err) {
    cb(err);
  }

}

module.exports = setMfa;
