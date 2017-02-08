"use strict";

module.exports.signup = require('./src/signup');
module.exports.signupConfirm = require('./src/signupConfirm');
module.exports.signupResend = require('./src/signupResend');
module.exports.login = require('./src/login');
module.exports.loginMfa = require('./src/loginMfa');
module.exports.loginPasswordResetRequired = require('./src/loginPasswordResetRequired');
module.exports.logout = require('./src/logout');
module.exports.passwordForgot = require('./src/passwordForgot');
module.exports.passwordReset = require('./src/passwordReset');
module.exports.passwordChange = require('./src/passwordChange');
module.exports.profile = require('./src/profile');
module.exports.profileEdit = require('./src/profileEdit');
module.exports.profileEditPhoneNumber = require('./src/profileEditPhoneNumber');
module.exports.mfa = require('./src/mfa');