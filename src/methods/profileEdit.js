const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const Helpers = require('../helpers');

/**
 * Edit a user's profile
 *
 * @param {poolData} poolData
 * @param {{username, refreshToken, accessToken, idToken, attributes}} body
 * @param {*} cb
 */
async function editProfile(poolData, body, cb) {
  try {
    const { attributes } = body;
    const cognitoUser = await Helpers.getCognitoUser(poolData, body);

    const attributeUpdateList = [];
    const attributeDeleteList = [];

    if (Array.isArray(attributes)) {
      attributes.forEach((item) => {

      // if the attribute concerns the phone number
        if (item.Name === 'phone_number') {
        // do nothing, rather use profileEditPhoneNumber
        // as there are some additionals checks concerning MFA to perform
        }

        // if the attribute has a value, update it with the new value
        else if (item.Value !== null) {
          const attribute = new AmazonCognitoIdentity.CognitoUserAttribute(item);
          attributeUpdateList.push(attribute);
        }

        // otherwise, delete the attribute for that user
        else {
          attributeDeleteList.push(item.Name);
        }
      });
    }

    // first, update requested attributes
    await new Promise((resolve, reject) => {
      cognitoUser.updateAttributes(attributeUpdateList, (err) => {
        if (err) return reject(err);
        return resolve();
      });
    });

    // then, delete requested attributes
    const data = await new Promise((resolve, reject) => {
      cognitoUser.deleteAttributes(attributeDeleteList, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });

    cb(null, data);
  }
  catch (err) {
    cb(err);
  }
}
module.exports = editProfile;
