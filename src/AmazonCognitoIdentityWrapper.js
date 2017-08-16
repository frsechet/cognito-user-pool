import login from './login';
import signup from './signup';
import signupConfirm from './signupConfirm';
import signupResend from './signupResend';
import loginMfa from './loginMfa';
import loginNewPasswordRequired from './loginNewPasswordRequired';
import logout from './logout';
import passwordForgot from './passwordForgot';
import passwordChange from './passwordChange';
import passwordReset from './passwordReset';
import profile from './profile';
import profileEdit from './profileEdit';
import profileEditPhoneNumber from './profileEditPhoneNumber';
import setMfa from './setMfa';
import getMfa from './getMfa';
import refreshSession from './refreshSession';

export default class CognitoIdentityWrapper {

  /**
   * @desc Wrapper constructor
   * @param {{UserPoolId: string, ClientId: string, Paranoia: number}} poolData
   */
  constructor(poolData) {
    if (!poolData) {
      throw new Error('Missing poolData');
    }
    if (!poolData.UserPoolId || !poolData.ClientId || !poolData.Paranoia) {
      throw new Error('Bad poolData object');
    }
    this.poolData = poolData;
  }

  login(body, cb) {
    return login(this.poolData, body, cb);
  }
  signup(body, cb) {
    return signup(this.poolData, body, cb);
  }
  signupConfirm(body, cb) {
    return signupConfirm(this.poolData, body, cb);
  }
  signupResend(body, cb) {
    return signupResend(this.poolData, body, cb);
  }
  loginMfa(body, cb) {
    return loginMfa(this.poolData, body, cb);
  }
  loginNewPasswordRequired(body, cb) {
    return loginNewPasswordRequired(this.poolData, body, cb);
  }
  logout(body, cb) {
    return logout(this.poolData, body, cb);
  }
  passwordForgot(body, cb) {
    return passwordForgot(this.poolData, body, cb);
  }
  passwordReset(body, cb) {
    return passwordReset(this.poolData, body, cb);
  }
  passwordChange(body, cb) {
    return passwordChange(this.poolData, body, cb);
  }
  profile(body, cb) {
    return profile(this.poolData, body, cb);
  }
  profileEdit(body, cb) {
    return profileEdit(this.poolData, body, cb);
  }
  profileEditPhoneNumber(body, cb) {
    return profileEditPhoneNumber(this.poolData, body, cb);
  }
  setMfa(body, cb) {
    return setMfa(this.poolData, body, cb);
  }
  getMfa(body, cb) {
    return getMfa(this.poolData, body, cb);
  }
  refreshSession(body, cb) {
    return refreshSession(this.poolData, body, cb);
  }

}