const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports = (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, password, attributes } = body;

  const attributesList = [];

  if (attributes) {
    attributes.forEach((item) => {
      const attribute = new AmazonCognitoIdentity.CognitoUserAttribute(item);
      attributesList.push(attribute);
    });
  }

  userPool.signUp(username, password, attributesList, null, (err, res) => {
    if (err) return cb(err);

    const cognitoUser = res.user;
    const data = {
      username: cognitoUser.getUsername(),
    };
    return cb(null, data);

  });

};
