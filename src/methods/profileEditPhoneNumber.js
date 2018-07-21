const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const Helpers = require('../helpers');


/**
 * Edit a user's phone number
 *
 * @param {poolData} poolData
 * @param {{username, refreshToken, accessToken, idToken}} body
 * @param {*} cb
 */
async function editPhoneNumber(poolData, body, cb) {
  try {
    const cognitoUser = await Helpers.getCognitoUser(poolData, body);
    const { phone_number } = body;

    // the user simply wants to add or change their phone number (required for MFA)
    if (phone_number) {
      const dataPhoneNumber = {
        Name: 'phone_number',
        Value: phone_number,
      };
      const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
      cognitoUser.updateAttributes([attributePhoneNumber], (err, res) => cb(err, res));
    }

    else {
      // if the user wants to delete their phone number we must first disable MFA
      await new Promise((resolve, reject) => {
        cognitoUser.disableMFA((err) => {
          if (err) return reject(err);
          return resolve();
        });
      });
      cognitoUser.deleteAttributes(['phone_number'], (err, res) => cb(err, res));
    }

  }
  catch (err) {
    cb(err);
  }

}

module.exports = editPhoneNumber;
