# Easily manage your users with AWS Cognito User Pools

This library is a wrapper around the client library aws-cognito-identity-js to easily manage your Cognito User Pool in a node.js backend environment.

## Note

This library was first developed when Cognito was still relatively new and complex to use from the backend. The situation improved greatly though, and it is probably better to use standard AWS SDKs now.

However, if you are looking for something simple, you can use this. If you want to use the full power of Amazon Cognito, you should probably use the official AWS SDK.

## Usage

At the root of your project, do:
```
npm install --save cognito-user-pool
```

Then in your project:
```
const poolData = {
  UserPoolId: USER_POOL_ID, // your user pool ID
  ClientId: USER_POOL_CLIENT_ID, // generated in the AWS console
  Paranoia: PARANOIA_LEVEL // an integer between 1 - 10
};
const CognitoUserPoolWrapper = require('cognito-user-pool')(poolData);
```

## Methods

### Signup

Signup a new user:

```
CognitoUserPoolWrapper.signup(params, callback)
```


```
params: {
  "username": "string",
  "password": "string",
  "attributes": [
    {
      "Name": "string",
      "Value": "string"
    }
  ]
}
```

### Signup Confirmation

Depending on your settings, email confirmation may be required.  
In that case, the following function must be called:

```
CognitoUserPoolWrapper.signupConfirm(params, callback)
```

```
params: {
  "username": "string",
  "confirmationCode": "string"
}
```

### Resend Signup Confirmation Code

If the user didn't receive the signup confirmation code, they may request a new code:

```CognitoUserPoolWrapper.signupResend(params, callback)```

```
params: {
  "username": "string"
}
```

### Login

Login an existing and confirmed user:

```
CognitoUserPoolWrapper.login(params, callback)
```

Note that `username` can be any alias field as defined in user pool settings.

```
params: {
  "username": "string",
  "password": "string"
}
```
This function returns either authentication tokens (more on that later) or a custom challenge for continuing the authentication process.
 
In that case, you get:
```
{
  "nextStep": "string",
  "loginSession": "string"
}
```

With `nextStep` being either `MFA_AUTH` or `NEW_PASSWORD_REQUIRED`.  
`MFA_AUTH` means a SMS was sent to their cell phone with a code to add to the `loginMfa` method, while `NEW_PASSWORD_REQUIRED` means they need to reset their password in the next step with `loginNewPasswordRequired`.

If authentication was successful, here is what you get:

```
{
  "refreshToken": "string",
  "accessToken": "string",
  "accessTokenExpiresAt": integer,
  "idToken": "string",
  "idTokenExpiresAt": integer
}
```
Please read [https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html] for more information.

You can use either `{ idToken, accessToken }` or `{ refreshToken }` to authenticate your user later on. For the sake of the example, we will use `{ idToken, accessToken }` in this readme, but both ways work interchangeably (and as a side note, it is better to use idToken + accessToken wherever possible).

### Login: MFA

Using the information from the `login` method and the `mfaCode` received by SMS:

```
CognitoUserPoolWrapper.loginMfa(params, callback)
```

```
params: {
  "username": "string",
  "loginSession": "string",
  "mfaCode": "string"
}
```

### Login: New Password Required

Using the information from the `login` method:

```
CognitoUserPoolWrapper.loginNewPasswordRequired(params, callback)
```

```
params: {
  "username": "string",
  "loginSession": "string",
  "newPassword": "string"
}
```

### Logout globally

This method invalidates all issued tokens, and the user will be logged out everywhere. For a simple local logout, you should use a local invalidation of user tokens (clear cookies, etc.).

```
CognitoUserPoolWrapper.logout(params, callback)
```

```
params: {
  "username": "string",
  "idToken": "string",
  "accessToken": "string"
}
```

### Refresh Session

Generate new `refreshToken`, `idToken` and `accessToken` with a new expiry date.

```
CognitoUserPoolWrapper.refreshSession(params, callback)
```

```
params: {
  "username": "string",
  "idToken": "string",
  "accessToken": "string"
}
```

If successful, you retrieve 3 auth tokens and the associated expiration dates (same as login):

```
{
  "refreshToken": "string",
  "accessToken": "string",
  "accessTokenExpiresAt": integer,
  "idToken": "string",
  "idTokenExpiresAt": integer
}
```

### Get MFA status

If MFA is enabled for this user, retrieve its options. Otherwise, returns `null`.

```
CognitoUserPoolWrapper.getMfa(params, callback)
```

```
params: {
  "username": "string",
  "idToken": "string",
  "accessToken": "string"
}
```

### Enable or Disable MFA

```
CognitoUserPoolWrapper.setMfa(params, callback)
```

```
params: {
  "enableMfa": boolean,
  "username": "string",
  "idToken": "string",
  "accessToken": "string"
}
```

### Get profile

Retrieve all attributes associated with this user.

```
CognitoUserPoolWrapper.profile(params, callback)
```

```
params: {
  "username": "string",
  "idToken": "string",
  "accessToken": "string"
}
```

### Edit profile

Use this endpoint to edit all user attributes except `phone_number` (see below).

```
CognitoUserPoolWrapper.profileEdit(params, callback)
```

If the `Value` of an attribute is left empty, that attribute will be removed. 

```
params: {
  "username": "string",
  "idToken": "string",
  "accessToken": "string",
  "attributes": [
    {
      "Name": "string",
      "Value": "string"
    }
  ]
}
```

### Confirm/Verify profile attribute change

Some attributes (such as `email`) need code verification after they have been updated by the user.  Use this endpoint to verify that attribute.

```
CognitoUserPoolWrapper.profileAttributeConfirm(params, callback)
```

```
params: {
  "username": "string",
  "idToken": "string",
  "accessToken": "string",
  "attribute": "string",
  "confirmationCode": "string"
}
```

### Edit phone number

Use this endpoint to change the user's phone number.

```
CognitoUserPoolWrapper.profileEditPhoneNumber(params, callback)
```

If `phone_number` is undefined or null, it will be removed and MFA will be disabled for this user.

```
params: {
  "username": "string",
  "idToken": "string",
  "accessToken": "string",
  "phone_number: "string"
}
```

### Change password

Use this endpoint to change the user's password.

```
CognitoUserPoolWrapper.passwordChange(params, callback)
```

```
params: {
  "username": "string",
  "idToken": "string",
  "accessToken": "string",
  "oldPassword": "string",
  "newPassword: "string"
}
```

### Forgot password

Start a forgot password flow.  
Cognito will send a `passwordResetCode` to one of the user's confirmed contact methods (email or SMS) to be used in the `passwordReset` method below.

```
CognitoUserPoolWrapper.passwordForgot(params, callback)
```

```
params: {
  "username": "string"
}
```

### Reset password

Finish the forgot password flow.  

```
CognitoUserPoolWrapper.passwordReset(params, callback)
```

```
params: {
  "username": "string",
  "passwordResetCode": "string",
  "newPassword": "string
}
```

### Error codes

The error codes are the standard error codes as returned by AWS Cognito: `https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/CommonErrors.html`
