import axios from 'axios';
import ApiTester from 'components/ApiTester';
import { useAppContext } from 'context/AppContext';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import config from '../../config/config.json';
import { login } from './../security/AuthService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, username, setUsername } = useAppContext();
  const [loginUserName, setLoginUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginButton = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const loginData = {
      username: loginUserName,
      password: password,
    };

    axios
      .post(config.api.authApi.getToken, loginData)
      .then((response) => {
        console.log(`Successfully logged in`);
        console.log(response.status);
        setIsLoggedIn(true);
        login(loginUserName, password);
        setUsername(loginUserName);
        navigate('/management');
      })
      .catch((error) => {
        console.error(`Error while logging in:`, error);
      });
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <ApiTester />
      <Form id="loginForm" onSubmit={handleLoginButton}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Uživatelské jméno</Form.Label>
          <Form.Control
            type="text"
            placeholder="Uživatelské jméno"
            value={loginUserName}
            onChange={(e) => setLoginUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Heslo</Form.Label>
          <Form.Control
            type="password"
            placeholder="TajneHeslo123"
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
