const Helpers = require('../helpers');

/**
 * Logout a user from all their sessions
 *
 * @param {*} poolData
 * @param {*} body
 * @param {*} cb
 */
async function logout(poolData, body, cb) {

  try {
    const cognitoUser = await Helpers.getCognitoUser(poolData, body);
    cognitoUser.globalSignOut({
      onFailure(err2) {
        cb(err2);
      },
      onSuccess(data) {
        cb(null, data);
      },
    });

  }
  catch (err) {
    cb(err);
  }

}

module.exports = logout;
