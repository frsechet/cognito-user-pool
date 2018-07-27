const getMfa = require('./getMfa.js');
const login = require('./login.js');
const loginMfa = require('./loginMfa.js');
const loginNewPasswordRequired = require('./loginNewPasswordRequired.js');
const logout = require('./logout.js');
const passwordChange = require('./passwordChange.js');
const passwordForgot = require('./passwordForgot.js');
const passwordReset = require('./passwordReset.js');
const profile = require('./profile.js');
const profileEdit = require('./profileEdit.js');
const profileEditPhoneNumber = require('./profileEditPhoneNumber.js');
const profileAttributeConfirm = require('./profileAttributeConfirm.js');
const refreshSession = require('./refreshSession.js');
const setMfa = require('./setMfa.js');
const signup = require('./signup.js');
const signupConfirm = require('./signupConfirm.js');
const signupResend = require('./signupResend.js');

module.exports = {
  getMfa,
  login,
  loginMfa,
  loginNewPasswordRequired,
  logout,
  passwordChange,
  passwordForgot,
  passwordReset,
  profile,
  profileEdit,
  profileEditPhoneNumber,
  profileAttributeConfirm,
  refreshSession,
  setMfa,
  signup,
  signupConfirm,
  signupResend
};
