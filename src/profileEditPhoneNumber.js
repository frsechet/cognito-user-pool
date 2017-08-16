import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export default (poolData, body, cb) => {

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const username = body.username;
  const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: body.refreshToken });
  const phone_number = body.phone_number;

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  // refresh the user session before anything else
  return cognitoUser.refreshSession(refreshToken, (err1, userSession) => {
    if (err1) {
      return cb(err1);
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
      return cognitoUser.updateAttributes(attributeList, (err2, res) => {
        if (err2) {
          return cb(err2);
        }
        return cb(null, res);

      });
    }

    // if the user wants to delete their phone number
    // it also means that we must disable MFA

    attributeList.push('phone_number');
    return cognitoUser.disableMFA((err3) => {
      if (err3) {
        return cb(err3);
      }

      return cognitoUser.deleteAttributes(attributeList, (err4, res) => {
        if (err4) {
          return cb(err4);
        }
        return cb(null, res);
      });
    });


  });

};