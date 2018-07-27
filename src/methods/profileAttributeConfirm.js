const Helpers = require('../helpers');

/**
 * Confirm user's attribute (such as email) using a confirmation code
 *
 * @param {*} poolData
 * @param {{attribute, username, confirmationCode, refreshToken, accessToken, idToken}} body
 * @param {*} cb
 */
async function profileAttributeConfirm(poolData, body, cb) {
  try {
    const { attribute, confirmationCode } = body;
    const cognitoUser = await Helpers.getCognitoUser(poolData, body);

    cognitoUser.verifyAttribute(attribute, confirmationCode, {
      onSuccess(result) {
        cb(null, result);
      },
      onFailure(err) {
        cb(err);
      }
    });
  } catch (err) {
    cb(err);
  }
}

module.exports = profileAttributeConfirm;
