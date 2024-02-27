import { useAppContext } from 'context/AppContext';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import config from '../../config/config.json';
import axios from 'axios';
import { useState } from 'react';
import { login } from './../security/AuthService';
import ApiTester from 'components/ApiTester';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginButton = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    axios
      .post(config.api.authApi.getToken, loginData)
      .then((response) => {
        console.log(`Successfully logged in`);
        console.log(response.status);
        setIsLoggedIn(true);
        login(username,password);
        navigate('/management');
      })
      .catch((error) => {
        console.error(`Error while logging in:`, error);
      });
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <ApiTester/>
      <Form id="loginForm" onSubmit={handleLoginButton}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Uživatelské jméno</Form.Label>
          <Form.Control
            type="text"
            placeholder="Uživatelské jméno"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
