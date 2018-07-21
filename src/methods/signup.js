const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/**
 * Signup user
 *
 * @param {poolData} poolData
 * @param {{ username: string, password: string, attributes: attributesModel }} body
 * @param {*} cb
 */
function signup(poolData, body, cb) {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, password, attributes } = body;

  const attributesList = [];

  if (Array.isArray(attributes)) {
    attributesList.push(...attributes.map(item => new AmazonCognitoIdentity.CognitoUserAttribute(item)));
  }

  userPool.signUp(username, password, attributesList, null, (err, res) => {
    if (err) return cb(err);

    const cognitoUser = res.user;
    const data = {
      username: cognitoUser.getUsername(),
    };
    cb(null, data);
  });

}

module.exports = signup;
