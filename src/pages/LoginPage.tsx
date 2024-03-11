import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import config from '../../config/config.json';
import { login } from './../security/AuthService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, username, setUsername } = useAppContext();
  const [loginUserName, setLoginUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLoginError, setShowLoginError] = useState(false);

  const handleLoginButton = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const loginData = {
      username: loginUserName,
      password: password,
    };

    axios
      .post(config.api.authApi.getToken, loginData)
      .then((response) => {
        if (response.status === 200) {
          console.log(`Successfully logged in`);
          console.log(response.status);
          setIsLoggedIn(true);
          login(loginUserName, password);
          setUsername(loginUserName);
          navigate('/management');
        } else if (response.status === 400) {
          setLoginError(response.data.message);
          setShowLoginError(true);
        }
      })
      .catch((error) => {
        console.error(`Error while logging in:`, error);

        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 400) {
            setLoginError('Nechybí nějaký údaj?');
          } else if (statusCode === 401) {
            setLoginError('Neplatné přihlašovací údaje.');
          } else {
            setLoginError('Nastala chyba při přihlášení.');
          }
        } else {
          setLoginError('Nastala chyba při komunikaci se serverem.');
        }

        setShowLoginError(true);
      });
  };

  return (
    <Container className="mt-5">
      <h2>Přihlášení</h2>
      <Form id="loginForm" onSubmit={handleLoginButton}>
        {showLoginError && <Alert variant="danger">{loginError}</Alert>}
        <Form.Group controlId="formUsername">
          <Form.Label>Uživatelské jméno</Form.Label>
          <Form.Control
            type="text"
            placeholder="Uživatelské jméno"
            value={loginUserName}
            onChange={(e) => setLoginUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Heslo</Form.Label>
          <Form.Control
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleLoginButton}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
