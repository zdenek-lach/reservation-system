import { useAppContext } from 'context/AppContext';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import config from '../../config/config.json';
import axios from 'axios';
import { FormEventHandler } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  const handleLoginButton = (e:Event) => {
    //TODO: login logic
    e.preventDefault()
      const editUrl =
        config.api.login;

      const username = e.target[0].value;
      const password = e.target[1].value;

    const loginData = {
      "username": username,
      "password": password,
    };

    axios
      .post(editUrl, loginData)
      .then((response) => {
        console.log(
          `Successfully logged in`
        );
        console.log(response.status);
      })
      .catch((error) => {
        console.error(
          `Error while logging in:`,
          error
        );
      });

    setIsLoggedIn(true);
    navigate('/management');
  };
  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form id="loginForm" onSubmit={handleLoginButton}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
