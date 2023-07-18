const express = require('express');
const router = express.Router();
const { SignUpCommand } = require('@aws-sdk/client-cognito-identity-provider');
const { CognitoIdentityProviderClient, ConfirmSignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");
const { InitiateAuthCommand } = require("@aws-sdk/client-cognito-identity-provider");

//REGISTRARSE
const client = new CognitoIdentityProviderClient();

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

const params = {
    ClientId: '58lf46lj37ub0585frb274kobk',
    Username: username,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'nickname', Value: 'testuser' }
    ],
  };
  
  try {
    const command = new SignUpCommand(params);
    const response = await client.send(command);
    res.json({ message: 'Usuario registrado exitosamente', data: response });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

//AUTENTICACION
const cognitoClient = new CognitoIdentityProviderClient();

router.post('/confirm', async (req, res) => {
  const { email, code } = req.body;

  const params = {
    ClientId: '58lf46lj37ub0585frb274kobk',
    ConfirmationCode: code,
    Username: email,
  };

  try {
    const command = new ConfirmSignUpCommand(params);
    const response = await cognitoClient.send(command);
    res.json({ message: 'Código de confirmación verificado', data: response });
  } catch (error) {
    console.error('Error al confirmar código:', error);
    res.status(500).json({ error: 'Error al confirmar código' });
  }
});

//INICIAR SESION 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const params = {
    ClientId: '58lf46lj37ub0585frb274kobk',
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);

    const accessToken = response.AuthenticationResult.AccessToken;
    const refreshToken = response.AuthenticationResult.RefreshToken;
    const idToken = response.AuthenticationResult.IdToken;

    res.json({ message: 'Inicio de sesión exitoso', accessToken, refreshToken, idToken });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});


module.exports = router;

