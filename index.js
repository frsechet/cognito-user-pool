import AmazonCognitoIdentityWrapper from './dist/AmazonCognitoIdentityWrapper';
// const AmazonCognitoIdentityWrapper = require('./dist/AmazonCognitoIdentityWrapper').default;

const plop = new AmazonCognitoIdentityWrapper({ UserPoolId: '123', ClientId: '123', Paranoia: 10 });
console.log(plop.login);
