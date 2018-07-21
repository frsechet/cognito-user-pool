const CognitoItentityMethods = require('./methods');

class CognitoIdentityWrapper {

  constructor(poolData) {
    this.poolData = poolData || null;
    return this;
  }

  login(body, cb) {
    return CognitoItentityMethods.login(this.poolData, body, cb);
  }

  signup(body, cb) {
    return CognitoItentityMethods.signup(this.poolData, body, cb);
  }

  signupConfirm(body, cb) {
    return CognitoItentityMethods.signupConfirm(this.poolData, body, cb);
  }

  signupResend(body, cb) {
    return CognitoItentityMethods.signupResend(this.poolData, body, cb);
  }

  loginMfa(body, cb) {
    return CognitoItentityMethods.loginMfa(this.poolData, body, cb);
  }

  loginNewPasswordRequired(body, cb) {
    return CognitoItentityMethods.loginNewPasswordRequired(this.poolData, body, cb);
  }

  logout(body, cb) {
    return CognitoItentityMethods.logout(this.poolData, body, cb);
  }

  passwordForgot(body, cb) {
    return CognitoItentityMethods.passwordForgot(this.poolData, body, cb);
  }

  passwordReset(body, cb) {
    return CognitoItentityMethods.passwordReset(this.poolData, body, cb);
  }

  passwordChange(body, cb) {
    return CognitoItentityMethods.passwordChange(this.poolData, body, cb);
  }

  profile(body, cb) {
    return CognitoItentityMethods.profile(this.poolData, body, cb);
  }

  profileEdit(body, cb) {
    return CognitoItentityMethods.profileEdit(this.poolData, body, cb);
  }

  profileEditPhoneNumber(body, cb) {
    return CognitoItentityMethods.profileEditPhoneNumber(this.poolData, body, cb);
  }

  setMfa(body, cb) {
    return CognitoItentityMethods.setMfa(this.poolData, body, cb);
  }

  getMfa(body, cb) {
    return CognitoItentityMethods.getMfa(this.poolData, body, cb);
  }

  refreshSession(body, cb) {
    return CognitoItentityMethods.refreshSession(this.poolData, body, cb);
  }

}

module.exports = function Wrapper(poolData) {
  return new CognitoIdentityWrapper(poolData);
};
