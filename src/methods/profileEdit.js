const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports = (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, attributes } = body;
  const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: body.refreshToken });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return cognitoUser.refreshSession(refreshToken, (err, userSession) => {
    if (err) {
      return cb(err);
    }
    cognitoUser.signInUserSession = userSession;

    const attributeUpdateList = [];
    const attributeDeleteList = [];

    if (attributes) {
      attributes.forEach((item) => {

        // if the attribute concerns the phone number
        if (item.Name === 'phone_number') {
          // do nothing, rather use profileEditPhoneNumber
          // as there are some additionals checks concerning MFA to perform
        }

        // if the attribute has a set value, update it with the new value
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

    // first, update the new params
    return cognitoUser.updateAttributes(attributeUpdateList, (err2) => {
      if (err2) return cb(err2);

      // now, delete the params that need to be deleted
      return cognitoUser.deleteAttributes(attributeDeleteList, (err3, res) => cb(err3, res));

    });

  });

};
