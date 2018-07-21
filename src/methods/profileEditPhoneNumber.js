const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports = (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const { username, phone_number } = body;
  const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: body.refreshToken });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  // refresh the user session before anything else
  return cognitoUser.refreshSession(refreshToken, (err, userSession) => {
    if (err) {
      return cb(err);
    }
    cognitoUser.signInUserSession = userSession;

    const attributeList = [];

    // the user wants to add or change their phone number (required for MFA)
    if (phone_number) {
      const dataPhoneNumber = {
        Name: 'phone_number',
        Value: phone_number,
      };
      const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
      attributeList.push(attributePhoneNumber);
      return cognitoUser.updateAttributes(attributeList, (err2, res) => cb(err2, res));
    }

    // if the user wants to delete their phone number
    // it also means that we must disable MFA

    attributeList.push('phone_number');
    return cognitoUser.disableMFA((err2) => {
      if (err2) return cb(err2);

      return cognitoUser.deleteAttributes(attributeList, (err3, res) => cb(err3, res));
    });

  });

};
